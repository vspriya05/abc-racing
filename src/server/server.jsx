import express from 'express';
import compression from 'compression';
import { readFileSync } from 'fs';

import { getSurveyQuestions } from './database';
import { getContentBundle, getLocale } from '../shared/localeUtil'

const app = new express();
const port = 7777;

app.use(compression());
app.use(express.static("dist"));

app.get("/data", async (req, res) => {

    res.json(await getSurveyQuestions(req));
});

app.get("/", async (req, res) => {

    const commonBundle = await getContentBundle(req, 'common');

    const index = readFileSync(`public/index.html`, `utf8`);

    res.send(index.replace("{{title}}", commonBundle.pageTitle)
    .replace("{{pageHeading}}", commonBundle.pageTitle)
    .replace("{{surveyTitle}}", commonBundle.surveyTitle)
    .replace("{{language}}", getLocale(req).split("-")[0]));
    
});

app.listen(port);