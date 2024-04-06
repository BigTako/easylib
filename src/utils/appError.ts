export class AppError {
  public status: 'fail' | 'error'
  constructor(
    public messages: string[],
    public statusCode: number
  ) {
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
  }
}
