import { PessoasController } from './pessoas.controller';

describe('PessoasController', () => {
  let controller: PessoasController;
  const pessoasServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    uploadPicture: jest.fn(),
  };

  beforeEach(() => {
    controller = new PessoasController(pessoasServiceMock as any);
  });

  it('create - deve usar o PessoaService com o argumento correto', async () => {
    const argument = { key: 'value' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(pessoasServiceMock, 'create').mockResolvedValue(expected);

    const result = await controller.create(argument as any);

    expect(pessoasServiceMock.create).toHaveBeenCalledWith(argument);
    expect(result).toEqual(expected);
  });

  it('findAll - deve usar o PessoaService', async () => {
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(pessoasServiceMock, 'findAll').mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(pessoasServiceMock.create).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('findOne - deve usar o PessoaService com o argumento correto', async () => {
    const argument = '1';
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(pessoasServiceMock, 'findOne').mockResolvedValue(expected);

    const result = await controller.findOne(argument as any);

    expect(pessoasServiceMock.findOne).toHaveBeenCalledWith(+argument);
    expect(result).toEqual(expected);
  });

  it('update - deve usar o PessoaService com os argumentos corretos', async () => {
    const argument1 = '1';
    const argument2 = { key: 'value' };
    const argument3 = { key: 'value' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(pessoasServiceMock, 'update').mockResolvedValue(expected);

    const result = await controller.update(
      argument1,
      argument2 as any,
      argument3 as any,
    );

    expect(pessoasServiceMock.update).toHaveBeenCalledWith(
      +argument1,
      argument2,
      argument3,
    );
    expect(result).toEqual(expected);
  });

  it('remove - deve usar o PessoaService com os argumentos corretos', async () => {
    const argument1 = 1;
    const argument2 = { aKey: 'aValue' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(pessoasServiceMock, 'remove').mockResolvedValue(expected);

    const result = await controller.remove(argument1 as any, argument2 as any);

    expect(pessoasServiceMock.remove).toHaveBeenCalledWith(
      +argument1,
      argument2,
    );
    expect(result).toEqual(expected);
  });

  it('uploadPicture - deve usar o PessoaService com os argumentos corretos', async () => {
    const argument1 = { aKey: 'aValue' };
    const argument2 = { bKey: 'bValue' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(pessoasServiceMock, 'uploadPicture').mockResolvedValue(expected);

    const result = await controller.uploadPicture(
      argument1 as any,
      argument2 as any,
    );

    expect(pessoasServiceMock.uploadPicture).toHaveBeenCalledWith(
      argument1,
      argument2,
    );
    expect(result).toEqual(expected);
  });
});
