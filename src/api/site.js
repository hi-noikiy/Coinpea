
import { _mAjax } from './index'
 
// 关于我们等
export const getSiteContent = (id) => _mAjax(`/coinex-interface/api/websit/article/websiteArticleList`,{'method': 'get', data:{typeId: id}})



