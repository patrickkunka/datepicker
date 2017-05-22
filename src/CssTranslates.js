/* eslint-disable no-magic-numbers */

import CssTranslate from './CssTranslate';

const Transforms = {};

Transforms.GO_TO_NEXT_MONTH = new CssTranslate([0, 0], [0, 0], [-100, 0], [-100, 0]);
Transforms.GO_TO_PREV_MONTH = new CssTranslate([0, 0], [-200, 0], [100, 0], [-100, 0]);
Transforms.GO_TO_NEXT_YEAR  = new CssTranslate([0, 0], [-100, 100], [0, -100], [-100, 0]);
Transforms.GO_TO_PREV_YEAR  = new CssTranslate([0, 0], [-100, -100], [0, 100], [-100, 0]);

export default Transforms;