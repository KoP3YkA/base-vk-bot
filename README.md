# Base for VK bot

## Information

This is a template for VK bots based on the vk-io library. The entire structure is written in OOP + angular-like style.

## Using

To write a new command, in logic/commands create a ts file with the following content:

```typescript
class DTO {
    @UserProperty
    public user!: User
    @StringProperty
    public reason!: string
}

@NamedChatCommand('example')
@ChatCommandAlias('ex')
export class ExampleCommand extends ChatCommandExecutor {

    public override async execute(
        command: ChatMessageEvent,
        @InjectableDto dto: DTO
    ): Nothing {
        throw new BaseCommandException('some_path');
    }

}
```

The bot is built on this principle.

## Tech stack

- Tests: Jest
- API wrapper: vk-io
- ORM: ModularORM
- Database: MySQL
- Linter: ESLint
- Code formatter: Prettier
- Language: TypeScript
- Git hooks: Husky
- All localization in yml files

## Starting

The project is already configured to build using Docker. To run the project, use

> docker-compose up --build

Don't forget to create a `.env` file based on `.env.example`