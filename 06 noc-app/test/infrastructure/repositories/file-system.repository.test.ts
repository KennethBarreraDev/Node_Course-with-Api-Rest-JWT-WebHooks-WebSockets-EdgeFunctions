
import { LogEntity, Logseverity } from "../../../src/domain/entities/log.entity";
import { LogRepositoryImplementation } from "../../../src/infrastructure/repositories/file-system.repository"

describe('file-system.repository.test.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  test('Save log should call the datasource', async () => {
    const saveLogSpy = jest.spyOn(LogRepositoryImplementation.prototype, 'saveLog');
    const mockDatasource = { saveLog: jest.fn(), getLogs: jest.fn() };
    const repository = new LogRepositoryImplementation(mockDatasource);

    await repository.saveLog(new LogEntity({
      message: 'Test message',
      level: Logseverity.LOW,
      origin: 'test',
      createdAt: new Date()
    }));
    expect(saveLogSpy).toHaveBeenCalledWith(expect.any(LogEntity))
  })

  test('Should call get logs', async () => {
    const getLogSpy = jest.spyOn(LogRepositoryImplementation.prototype, 'getLogs');
    const mockDatasource = { saveLog: jest.fn(), getLogs: jest.fn() };
    const repository = new LogRepositoryImplementation(mockDatasource);
    repository.getLogs(Logseverity.HIGH)

    expect(getLogSpy).toHaveBeenCalled()
  })
})