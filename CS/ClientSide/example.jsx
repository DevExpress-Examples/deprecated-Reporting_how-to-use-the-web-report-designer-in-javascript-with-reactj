"use strict"
const host = 'http://localhost:54111/';

class ReportDesigner extends React.Component {
    constructor(props) {
        super(props);
        this.reportUrl = ko.observable(props.reportUrl);
        this.requestOptions = {
            host,
            getDesignerModelAction: "/ReportDesigner/GetReportDesignerModel"
        };
    }
    render() {
        return (<div ref="designer" data-bind="dxReportDesigner: $data"></div>);
    }
    componentWillReceiveProps(newProps) {
        this.reportUrl(newProps.reportUrl);
    }
    componentDidMount() {
        ko.applyBindings({
            reportUrl: this.reportUrl,
            requestOptions: this.requestOptions
        }, this.refs.designer);
    }
    componentWillUnmount() {
        ko.cleanNode(this.refs.designer);
    }
};

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "Products" };
    }
    render() {
        return (<div className="fullscreen">
            <ReportDesigner reportUrl={this.state.value} />
        </div>);
    }
}

ReactDOM.render(<Root />, document.getElementById("designerhost"))