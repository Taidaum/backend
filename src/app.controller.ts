import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  path: '',
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor() {
    //
  }

  @Get('')
  getRoot() {
    return 'ok';
  }
}
