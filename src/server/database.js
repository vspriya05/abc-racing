
import { getContentBundle } from '../shared/localeUtil';


export function getSurveyQuestions(req) {
    
    return getContentBundle(req, "survey");
}
