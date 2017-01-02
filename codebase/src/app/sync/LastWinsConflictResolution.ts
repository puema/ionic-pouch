import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {ConflictResolutionStrategyBase} from "./ConflictResolutionStrategyBase";
import {Injectable, Inject} from "@angular/core";
import {IDatabaseService} from "../data/IDatabaseServie";

@Injectable()
export class LastWinsConflictResolution extends ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    super(database);
  }
}
