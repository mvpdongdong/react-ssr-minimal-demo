import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { setClientLoad, fatchTopList } from "../redux/actions";
import ListItem from "../components/ListItem";
import "../assets/top-list.styl";

class TopList extends React.Component {
  static asyncData(store) {
    return store.dispatch(fatchTopList());
  }
  componentDidMount() {
    // 如果不是服务端环境
    if (process.env.REACT_ENV !== "server") {
      // 判断是否需要加载数据
      if (this.props.clientShouldLoad === true) {
        this.props.dispatch(fatchTopList());
      } else {
        // 客户端执行后，将客户端是否加载数据设置为true
        this.props.dispatch(setClientLoad(true));
      }
    }
  }
  render() {
    const { match, topList } = this.props;
    return (
      <div>
        <Helmet>
          <title>Top List</title>
        </Helmet>
        <ul className="list-wrapper">
          {
            topList.map(item => {
              return <li className="list-item" key={item.id}>
                <NavLink to={`${match.url}/${item.id}`}><ListItem {...item} /></NavLink>
              </li>;
            })
          }
        </ul>
      </div>
    )
  }
}

export default TopList;
