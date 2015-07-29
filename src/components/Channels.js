import React from 'react';
import './channels.scss';

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    this.props.loadChannels();
  }

  render() {
    const {channelsReady, channelsError, channels, channelId} = this.props.news || {};
    return (
      <div className="channel-container">
        {!channelsReady && <div className="boxLoading"></div>}
        {channelsError && <span>频道加载失败</span>}
        {channels && channels.map(channel => {
          return (
            <span key={channel.channelId} className={`channel-btn ${channelId === channel.channelId && 'active'}`}
                  onClick={this.props.selectChannel.bind(this, channel.channelId)}>
              {channel.name}
            </span>
          );
        })}
      </div>
    );
  }
}

export default Channels;
