import { TestBed } from '@angular/core/testing';

import { GamePlayService } from './game-play.service';

describe('GameplayService', () => {
  let service: GamePlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
