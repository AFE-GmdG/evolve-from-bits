declare type ModuleResult = {
  _calculateNetwork: () => number;
};
declare function Module(): Promise<ModuleResult>;
export default Module;
