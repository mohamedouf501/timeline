import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('changelog')
  getChangelog(): string {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');

    if (fs.existsSync(changelogPath)) {
      return fs.readFileSync(changelogPath, 'utf-8');
    } else {
      return 'CHANGELOG.md not found.';
    }
  }
}
