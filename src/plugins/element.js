import Vue from 'vue'
import { Button,
    Form,
    FormItem,
    Input, 
    Checkbox,
    Dialog,
    MessageBox,
    Notification,
    Col,
    Alert,
    Select,
    Option,
    Message
} from 'element-ui'

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Col);
Vue.use(Alert);
Vue.use(Select);
Vue.use(Option);
Vue.use(Message);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

