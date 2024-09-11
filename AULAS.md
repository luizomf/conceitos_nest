1. Introdução ao curso - 6m
2. Requisitos do NestJS e ambiente de desenvolvimento do curso - 9m
3. Instalando o @nestjs/cli - Interface de linha de comando do NestJS - 13m
4. Conheça e entenda os arquivos básicos gerados pelo NestJS CLI - 17m
5. Arquivo main.ts, função bootstrap(), NestFactory e porta do app NestJS - 10m
6. Criando meu próprio módulo (Module) manualmente ou com Nest CLI - 19m
7. Sobre o código das aulas no Github - 3m
8. Básico sobre protocolo HTTP, URLs, recursos e métodos de solicitação (GET) -
   17m
9. Continuação da aula anterior + Extensão Rest Client do VS Code - 10m
10. Criando seu Primeiro Controller - Manualmente ou com NestJS CLI - 15m
11. Service / Provider - entendendo o básico da injeção de dependências do
    NestJS - 16m
12. Novo módulo (module) e controller (controlador) para nossa aplicação
    NestJS - 8m
13. Informação importante sobre nomenclatura (use inglês sempre que possível) -
    1m
14. Criando parâmetros de rota de forma dinâmica para o ID do recurso -
    @Get(':id') - 6m
15. O decorator @Param é usado para ler valores dos parâmetros de rotas - 6m
16. Método HTTP POST e decorator @Post - Uma rota para criar coisas no NestJS -
    5m
17. @Body - Usado para ler valores do corpo da requisição HTTP POST - 10m
18. Decorator HttpCode e Enum HttpStatus para códigos de status de respostas
    HTTP - 9m
19. Rota para atualizar um recado (update) com métodos PATCH ou PUT e
    decoradores - 8m
20. Rota para apagar um recado (delete) com método DELETE e decorador Delete -
    3m
21. Query parameters (parâmetros de consulta) da URL para exemplo de paginação -
    7m
22. Configurando o VS Code, tema, Eslint e Prettier para manter um código
    uniforme - 12m
23. Criando o provider (service) RecadosService - 6m
24. Criando uma Entity (Entidade) Recado e concluindo nosso service de BD em
    memória - 22m
25. Usando HttpException e NotFoundException para exibir mensagens de erro
    HTTP - 14m
26. DTOs (Data Transfer Object) para transportar, validar e transformar dados -
    15m
27. Validando dados de entrada com useGlobalPipes, ValidationPipe e
    class-validator - 13m
28. Use PartialType de Mapped-Types para a validação de campos em
    UpdateRecadoDto - 10m
29. Segurança - opções whitelist e forbidNonWhitelisted de ValidationPipe do
    NestJS - 5m
30. Converter tipos c/ transform do ValidationPipe e Pipes de Param padrão no
    NestJS - 16m
31. Instalando o Banco de Dados PostgreSQL 16 e o DBeaver CE no Windows - 15m
32. Configurando o TypeOrmModule com PostgreSQL (módulo do TypeORM para
    NestJS) - 8m
33. Primeira Entity do TypeOrm no NestJS (primeira tabela na base de dados
    PSQL) - 13m
34. Usando InjectRepository e Repository para ler e manipular a entity na
    tabela - 11m
35. Usando o Repository para criar (create) e apagar (delete) uma Entity da
    tabela - 8m
36. Usando o Repository para atualizar (update) uma Entity na tabela - 7m
37. Criando um módulo (Resource) para Entity "Pessoa" (usuário da nossa
    aplicação) - 12m
38. CRUD de Pessoa: criando o create com e-mail único na tabela (unique) - 16m
39. CRUD de Pessoa: criando o findAll, findOne (Read) e remove (Delete) - 5m
40. CRUD de Pessoa: criando o Update - 6m
41. Relações ManyToOne e OneToMany entre Entities Recado e Pessoa - 13m
42. Injetando dependências de outros módulos c/ "imports" e "exports" de
    Module - 7m
43. Criando um Recado com relação ManyToOne com Pessoa - 11m
44. Usando onDelete e onUpdate CASCADE para propagar alterações com
    relacionamentos - 5m
45. Modificando o Updade (Atualização) do Service de Recado para retornar a
    relação - 5m
46. DTO e validação de dados para paginação (take/limit e skip/offset do
    TypeOrm) - 20m Iniciar
47. Documentação Oficial do TypeORM e NestJS/TypeORM - 1m
48. Pipes - como e quando usar um Pipe de Validação e/ou Transformação de
    dados - 18m
49. Interceptors - Adicionando cabeçalho à resposta HTTP com NestJS
    Interceptor - 13m
50. Interceptors - observando dados antes e depois da execução do método com
    tap - 9m
51. Interceptors - capturando e modificando erros globais da aplicação
    (Exceptions) - 9m
52. Interceptors - criando um cache simples - 10m
53. Interceptors - alterando os dados de resposta com map - 6m
54. Injeção de dependência em Interceptors, Pipes e outras classes
    (Injectable) - 7m
55. Usando Interceptors para autorização de token de login (Authorization
    Token) - 10m
56. Middleware - Tenha acesso direto à Request e Response do Servidor - 27m
57. Exception Filters - Filtrando e manipulando exceções no NestJS - 23m
58. Guards - Como permitir ou negar acesso em rotas do servidor NestJs - 14m
59. Limpeza do código - 5m
60. Parâmetros personalizados com createParamDecorator (Custom Param
    Decorator) - 9m
61. O básico da injeção de dependências no NestJS (Dependency Injection - DI) -
    7m
62. Encapsulamento e exports do módulo + Dependência circular e forwardRef no
    NestJS - 8m
63. Providers com useClass e useValue para entregar tokens e valores
    diferentes - 8m
64. Injetando valores que não são classes com "Inject" e "provide" (token) - 6m
65. Classes abstratas e interfaces com provide e useClass para Padrões de
    Projeto - 19m
66. Provide, useFactory e inject para Lógica Avançada na Injeção de
    Dependências - 14m
67. Utilizando useFactory com async e await para Gerenciar Providers
    Assíncronos - 4m
68. Criando módulos dinâmicos que recebem configuração (NestJS DynamicModule) -
    16m
69. Teoria sobre escopo de providers: Scope.DEFAULT, Scope.REQUEST e
    Scope.TRANSIENT - 8m
70. Exemplo para escopo de providers: Scope.DEFAULT, Scope.REQUEST e
    Scope.TRANSIENT - 11m
71. Instalando @nestjs/config e criando variáveis de ambiente (.env) no NestJS -
    16m
72. Quando, qual e de onde carregar o arquivo .env? Use envFilePath e
    ignoreEnvFile - 4m
73. Usando @hapi/joi para validar as configurações do .env (variáveis de
    ambiente) - 7m
74. Usando o ConfigService do ConfigModule para obter valores de dentro do
    .env - 6m
75. Usando o ConfigService para obter valores do .env diretamente no módulo -
    12m
76. Criando configurações parciais com namespaces, registerAs, ConfigType e
    mais - 13m
77. Devo separar as configurações em um módulo à parte? Depende! - 6m
78. O que é JWT e como funcionará nosso sistema de autenticação e autorização -
    14m
79. Criando o sistema de Hashing com Bcrypt e o AuthModule (módulo de
    autenticação) - 11m
80. Salvando o hash de senha do bcrypt na base de dados ao criar um usuário - 8m
81. Criando o AuthService e AuthController para rota de Login do usuário - 9m
82. Autenticando o usuário com email e senha usando o Hash de senha e
    HashingService - 13m
83. Namespace das configurações e .env que serão usados para o JwtModule - 8m
84. Instalando o @nestjs/jwt e assinando o jwt token com JwtService e
    JwtModule - 9m
85. AuthTokenGuard será o Guard usado para permitir ou bloquear acesso às
    rotas - 17m
86. Dica: usando variáveis para pegar o response.body.accessToken no Rest
    Client - 4m
87. Enviando dados do token payload usando TokenPayloadDto para controller e
    service - 8m
88. Modificando update e remove em Pessoa para usar os dados do Jwt
    TokenPayload - 9m
89. Modificando create, update e remove de Recado com dados do Jwt
    TokenPayload - 13m
90. Como funcionam os Refresh Token em JWT? (Aula extra) - 7m
91. Gerando o Refresh Token junto com o Access Token (Aula extra) - 14m
92. Gerando novos tokens usando o Refresh Token (Aula extra) - 10m
93. Tem como invalidar tokens ou bloquear o usuário? Entenda e resolva! - 11m
94. Entendendo Reflector e SetMetadata para metadados (Policy-Based
    Authorization) - 19m
95. Campo Enum para Route Policies em Pessoa Entity (Policy-Based
    Authorization) - 14m
96. Concluindo o RoutePolicyGuard (Policy-Based Authorization) - 14m
97. Limpeza do código (Removendo Policy-Based Authorization) - 5m
98. Rest Client com multipart/form-data e FileInterceptor + UploadedFile - 19m
99. Salvando o Buffer do arquivo enviado no disco do servidor - 9m
100. FilesInterceptor e UploadedFiles para upload de múltiplos arquivos - 6m
101. Validação de arquivos enviados com ParseFilePipeBuilder e ParseFilePipe -
     12m
102. Usando ServeStaticModule para servir arquivos estáticos no NestJS - 6m
103. Adicionando o campo picture na base de dados e movendo a lógica para o
     service - 8m
104. Alerta: testes podem ser complexos - 9m
105. Scripts do package.json para executar testes com Jest no NestJS - 5m
106. Escrevendo meu primeiro teste com Jest no NestJs -
     pessoas.service.spec.ts - 19m
107. Usando TestingModule e Test de nestjs/testing para configurar todo o nosso
     teste - 12m
108. Definindo o que você vai testar - 8m
109. Usando jest.fn e jest.spyOn para simular chamadas e retornos de métodos -
     13m
110. Completando o teste e entendendo linha a linha o que estamos testando - 9m
111. Escrevendo um teste para garantir que uma Exception ocorreu - 7m
112. Use os relatórios de coverage para conferir se tudo está testado
     corretamente - 9m
113. Teste unitário do método findOne do PessoasService e verificando coverage -
     11m
114. Teste unitário do método findAll em PessoasService - 6m
115. Teste unitário - método update de PessoasService (caso onde Pessoa é
     atualizada) - 11m
116. Teste do método update em PessoasService (NotFoundException,
     ForbiddenException) - 4m
117. Teste unitário do método remove em PessoasService (Completo) - 4m
118. Testes unitários finais do PessoasService (uploadPicture) + coverage 100% -
     8m
119. Testes unitários de PessoasController sem usar Test e TestingModule - 8m
120. Testes unitários para validação dos DTOs - 4m
121. Configurando os testes end-to-end (E2E) - 18m
122. Teste E2E (end-to-end): deve criar uma pessoa com sucesso - /pessoas
     (POST) - 12m
123. Exemplos de testes E2E (end-to-end) para te ajudar a criar seus próprios
     testes - 6m
124. Teste E2E com JWT Authorization Token - 16m
125. Mais exemplos de testes E2E em código para a rota /pessoas - 2m
126. Segurança e BUILD: .env, .env-example, CORS, Helmet, ThrottlerModule e
     mais - 20m
127. Masterclass Deploy - Criando um servidor Ubuntu na Google Cloud Platform
     (GCP) - 31m
128. Masterclass Deploy - Configurando PostgreSQL, Node.js, Letsencrypt, Nginx e
     PM2 - 38m
129. Masterclass Deploy - modificações na sua API REST (Local -> Git ->
     Remoto)? - 13m
