import * as spec from '@jsii/spec';
import { Rosetta } from 'jsii-rosetta';

import { Generator, GeneratorOptions } from '../generator';
import { Target, TargetOptions } from '../target';

// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports

export default class Ruby extends Target {
  protected readonly rubyGenerator: RubyGenerator;

  public constructor(options: TargetOptions) {
    super(options);

    this.rubyGenerator = new RubyGenerator(options.rosetta);
  }

  public get generator() {
    return this.rubyGenerator;
  }

  public async generateCode(outDir: string, tarball: string): Promise<void> {
    await super.generateCode(outDir, tarball);
  }

  public async build(sourceDir: string, outDir: string): Promise<void> {
    await this.copyFiles(sourceDir, outDir);
  }
}

class RubyGenerator extends Generator {
  public constructor(_rosetta: Rosetta, options: GeneratorOptions = {}) {
    super(options);

    this.code.openBlockFormatter = (s) => `${s}:`;
    this.code.closeBlockFormatter = (_s) => false;
    this.code.indentCharacter = '\t';
    this.code.indentation = 1;
  }

  protected onBeginInterface(ifc: spec.InterfaceType) {
    this.code.line(ifc.name);
  }

  protected onEndInterface(_ifc: spec.InterfaceType) {
    this.code.line(_ifc.name);
    return;
  }

  protected onInterfaceMethod(ifc: spec.InterfaceType, _method: spec.Method) {
    this.code.line(ifc.name);
  }

  protected onInterfaceProperty(ifc: spec.InterfaceType, _prop: spec.Property) {
    this.code.line(ifc.name);
  }

  protected onInterfaceMethodOverload(
    _ifc: spec.InterfaceType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    throw new Error('Unhandled Type: InterfaceMethodOverload');
  }

  protected onMethodOverload(
    _cls: spec.ClassType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    throw new Error('Unhandled Type: MethodOverload');
  }

  protected onStaticMethodOverload(
    _cls: spec.ClassType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    throw new Error('Unhandled Type: StaticMethodOverload');
  }

  protected onStaticMethod(_cls: spec.ClassType, _method: spec.Method) {
    return;
  }

  protected onStaticProperty(_cls: spec.ClassType, _prop: spec.Property) {
    return;
  }

  protected onMethod(_cls: spec.ClassType, _method: spec.Method) {
    return;
  }

  protected onProperty(_cls: spec.ClassType, _prop: spec.Property) {
    return;
  }

  protected onUnionProperty(
    cls: spec.ClassType,
    prop: spec.Property,
    _union: spec.UnionTypeReference,
  ) {
    this.onProperty(cls, prop);
  }
}
