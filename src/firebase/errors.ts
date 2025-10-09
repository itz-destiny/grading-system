export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    super(
      `Firestore Permission Denied: Cannot ${context.operation} at ${context.path}`
    );
    this.name = 'FirestorePermissionError';
    this.context = context;
  }

  toDetailedString(): string {
    let details = `
Firestore Permission Error:
- Operation: ${this.context.operation}
- Path: ${this.context.path}`;
    if (this.context.requestResourceData) {
      details += `
- Request Data: ${JSON.stringify(this.context.requestResourceData, null, 2)}`;
    }
    return details;
  }
}
