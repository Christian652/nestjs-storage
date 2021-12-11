export default interface MailOptions{
  to: string[],
  from?: string,
  subject: string,
  text?: string,
  html?: string,
  attachments?: any,
  template?: string,
  context?: any
}