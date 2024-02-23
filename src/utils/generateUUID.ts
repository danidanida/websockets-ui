/*export function generateUUID(): string {
    let dt: number = new Date().getTime();
    const uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string) {
      const r: number = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }*/

  export function generateNumericID() {
    const timestamp = new Date().getTime();
  
    const randomComponent = Math.floor(Math.random() * 1000);
  
    const uniqueID = timestamp * 1000 + randomComponent;
  
    return uniqueID;
  }