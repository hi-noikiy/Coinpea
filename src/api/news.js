
import { _mAjax } from './index';
// 新闻左侧标题
export const newsTabs = () => _mAjax(` /coinex-interface/api/websit/article/informationList`)

// 新闻右侧内容
export const newsLists = (id) => _mAjax(`/coinex-interface/api/websit/article/articleList`,{'method': 'get', data:{typeId: id}}) 
