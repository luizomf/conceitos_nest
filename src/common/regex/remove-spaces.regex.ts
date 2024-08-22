import { RegexProtocol } from './regex.protocol';

export class RemoveSpacesRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/\s+/g, '');
  }
}
