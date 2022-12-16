
export type UniSigningAlgorithm = 'hmac-sha256'

export interface UniConfig {
  accessKeyId: string
  accessKeySecret?: string
  signingAlgorithm?: UniSigningAlgorithm
  endpoint?: string
  userAgent?: string
}
