import Vue from 'vue'
import { Button,
    Form,
    FormItem,
    Input, 
    Checkbox,
    Dialog,
    MessageBox,
    Col
} from 'element-ui'

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Col)

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
