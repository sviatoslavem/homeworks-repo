class PermissionException extends Error {
  constructor(msg) {
    super(msg);
    this.name = "PermissionException";
  }
}

export default PermissionException;
