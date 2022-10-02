import { isObject } from 'class-validator'

export function payloadToFormData(payload: any) {
  const formData = new FormData()
  const parsedPayload: [string, any][] = Object.entries(payload)

  for (const [key, value] of parsedPayload) {
    handleFormData(formData, value, key)
  }
  return formData
}

export function handleFormData(
  formData: FormData,
  value: any,
  parentKey: string
) {
  if (isObject(value) && !(value instanceof File)) {
    for (const [k, v] of Object.entries(value)) {
      handleFormData(formData, v, parentKey ? `${parentKey}[${k}]` : k)
    }
  } else {
    value && formData.append(parentKey, value)
  }
}
