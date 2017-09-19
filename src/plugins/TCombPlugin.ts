import Spin from "../Spin";
import { ConfigPlugin } from "../ConfigPlugin";
import { Builder } from "../Builder";
import requireModule from '../requireModule';
import findJSRule from './shared/JSRuleFinder';

export default class TCombPlugin implements ConfigPlugin {
    configure(builder: Builder, spin: Spin) {
        const stack = builder.stack;

        if (stack.hasAll(['tcomb', 'webpack']) && !stack.hasAny('dll')) {
            const jsRule = findJSRule(builder);
            jsRule.use = spin.merge(jsRule.use, {
                options: {
                    plugins: [
                        [requireModule.resolve('babel-plugin-tcomb')],
                    ],
                },
            });
        }
    }
}