import {MethodExpression} from '../expressions/method_expression';
import {IExpression} from '../expressions/iexpression';

export class GeoDistance extends MethodExpression {

    constructor(left: IExpression, right: IExpression) {
        super();

        this.expressions = [left, right];
    }

    public methodName: string = 'geo.distance';
}
