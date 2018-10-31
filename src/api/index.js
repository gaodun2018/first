import * as course from './course'
import * as fromAxios from './fromAxios'
import * as login from './login'
import * as outline from './outline'
import * as plan from './plan'
import * as planop from './plantop'
import * as resource from './resource'
import * as picture from './picture'

function Service() {
    Object.keys(course).map(item => {
        this[item] = course[item]
    })
    Object.keys(fromAxios).map(item => {
        this[item] = fromAxios[item]
    })
    Object.keys(resource).map(item => {
        this[item] = resource[item]
    })
    Object.keys(login).map(item => {
        this[item] = login[item]
    })
    Object.keys(outline).map(item => {
        this[item] = outline[item]
    })
    Object.keys(plan).map(item => {
        this[item] = plan[item]
    })
    Object.keys(planop).map(item => {
        this[item] = planop[item]
    })
    Object.keys(picture).map(item => {
        this[item] = picture[item]
    })

}
export default new Service()
