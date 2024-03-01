export type TokenData = {
    userID: number;
    userRole: string;
  };
  
  declare global {
    // Express
    namespace Express {
      export interface Request {
        tokenData: TokenData;
      }
    }
  }