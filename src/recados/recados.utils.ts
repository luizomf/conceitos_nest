import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtils {
  inverteString(str: string) {
    // Luiz -> ziuL
    console.log('NÃO É MOCK');
    return str.split('').reverse().join('');
  }
}

@Injectable()
export class RecadosUtilsMock {
  inverteString() {
    console.log('Passei no MOCK');
    return 'bla bla bla';
  }
}
