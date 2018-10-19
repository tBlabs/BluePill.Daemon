import { CommandResolver } from "./CommandResolver";
import { Mock, It } from "moq.ts";
import { Config } from "./Config";
import { IoState } from "./IoState";
import { StringKeyValuePairs } from "./StringKeyValuePairs";
import { IStorage } from "./IStorage";

describe(CommandResolver.name, () =>
{
    it(CommandResolver.prototype.Resolve.name, () =>
    {
        // Given
        const _storageMock = new Mock<IStorage<StringKeyValuePairs>>()
            .setup(i => i.Read).returns(() => ({ host: "localhost:1234" }))
            .setup(i => i.Write(It.IsAny<string>())).callback(() => { });
        const _config = new Config(_storageMock.object());
        const sut = new CommandResolver(_config);
        const ioState = new IoState();
        ioState.addr = 1;
        ioState.currentValue = 123;

        // When
        const ret = sut.Resolve("onChange", "http://{host}/{this.event}/{this.addr}/{this.value}", ioState);

        // Then
        expect(ret).toBe('http://localhost:1234/onChange/1/123');
    });
});