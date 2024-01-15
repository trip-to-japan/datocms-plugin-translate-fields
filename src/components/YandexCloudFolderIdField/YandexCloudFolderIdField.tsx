import { TextField } from 'datocms-react-ui'
import { useState } from 'react'

type YandexCloudFolderIdFieldProps = {
  value: string
  onBlur: (newValue: string) => void
}

export default function YandexCloudFolderIdField({
  value,
  onBlur,
}: YandexCloudFolderIdFieldProps) {
  const [folderId, setFolderId] = useState<string>(value)

  return (
    <TextField
      required
      name="yandexFolderId"
      id="yandexFolderId"
      label="Yandex Cloud folder ID"
      value={folderId}
      placeholder="Enter Yandex folder ID"
      textInputProps={{
        onBlur: (e) => {
          onBlur(e.target.value)
        },
      }}
      onChange={(newValue) => setFolderId(newValue)}
    />
  )
}
