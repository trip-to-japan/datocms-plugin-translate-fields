import TextTranslationClient, {
  InputTextItem,
  TranslatedTextItemOutput,
  TranslatorCredential,
  isUnexpected,
} from '@azure-rest/ai-translation-text'
import { TranslationOptions } from '../types'

const ENDPOINT = 'https://api.cognitive.microsofttranslator.com'
const REGION = 'japaneast'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const translateCedential: TranslatorCredential = {
    key: options.apiKey,
    region: REGION,
  }
  const translationClient = TextTranslationClient(ENDPOINT, translateCedential)

  const inputText: InputTextItem[] = [{ text: string }]
  const translateResponse = await translationClient.path('/translate').post({
    body: inputText,
    queryParameters: {
      to: options.toLocale,
      from: options.fromLocale,
    },
  })

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error
  }

  const translations = translateResponse.body as TranslatedTextItemOutput[]
  for (const translation of translations) {
    for (const row of translation.translations) {
      if (row.to === options.toLocale) {
        return row.text
      }
    }
  }

  throw new Error('Translation not found in response')
}
