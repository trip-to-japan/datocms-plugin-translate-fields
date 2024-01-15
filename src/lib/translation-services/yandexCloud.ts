import { TranslationOptions } from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const request = await fetch(
    // `https://translate.api.cloud.yandex.net/translate/v2/translate`,
    'https://www.triptojapan.com/api/yandex-cloud-translate',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Api-Key ${options.apiKey}`,
      },
      body: JSON.stringify({
        sourceLanguageCode: options.fromLocale,
        targetLanguageCode: options.toLocale.slice(0, 2),
        texts: [string],
        folderId: options.yandexCloudOptions?.folderId ?? '',
      }),
    },
  )

  if (request.status !== 200) {
    throw new Error(`Yandex returned status ${request.status}`)
  }

  const response = await request.json()
  return response.translations[0]['text']
}
