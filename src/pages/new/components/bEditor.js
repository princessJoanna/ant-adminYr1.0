import RcUeditor from 'react-ueditor-wrap';

class Beditor extends React.Component {

  hanldeChage = (value) => {
      console.log('RcUeditor', value);
  }

  render() {
      return (
          <div>
              <RcUeditor ueditorUrl="/assets/ueditor/ueditor.all.min.js"  ueditorConfigUrl="/assets/ueditor/ueditor.config.js" onChange={this.hanldeChage} />
          </div>
      );
  }
}

export default Beditor;