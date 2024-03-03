export type TokenData = {
    userID: number;
    roleName: string;
  };
  
  declare global {
    // Express
    namespace Express {
      export interface Request {
        tokenData: TokenData;
      }
    }
  }