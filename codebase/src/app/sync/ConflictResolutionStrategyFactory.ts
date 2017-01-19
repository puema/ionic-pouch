import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {LastWinsConflictResolution} from "./LastWinsConflictResolution";
import {MergeConflictResolution} from "./MergeConflictResolution";
import {Injectable, Inject} from "@angular/core";

@Injectable()
export class ConflictResolutionStrategyFactory {

  public strategies: IConflictResolutionStrategy[] = [];

  constructor(@Inject("LastWinsConflictResolution") lastWinsStrategy: LastWinsConflictResolution,
              @Inject("MergeConflictResolution") mergeStrategy: MergeConflictResolution) {
    this.strategies.push(lastWinsStrategy);
    this.strategies.push(mergeStrategy)
  }


}
