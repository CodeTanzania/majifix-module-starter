'use strict';

/**
 * @apiDefine Module  Module
 *
 * @apiDescription <put description here>
 *
 *
 * @author <author name><author email>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */

/* define apidoc here */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/* local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';
const PATH_SINGLE = '/modules/:id';
const PATH_LIST = '/modules';
const PATH_CHILDREN = '/modules/:module/modules';

/* declarations */
const Module = require(path.join(__dirname, 'module.model'));
const router = new Router({
    version: API_VERSION
});


/**
 * @api {get} /modules List modules
 * @apiVersion 0.1.0
 * @apiName Getmodules
 * @apiGroup Module
 * @apiDescription Returns a list of modules
 * @apiUse ModuleRequestHeader
 * @apiUse modules
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-Module.herokuapp.com/v0.1.0/modules
 *
 * @apiUse ModuleRequestHeaderExample
 * @apiUse modulesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getModules(request, response, next) {

    //obtain request options
    const options = _.merge({}, request.mquery);

    Module
        .get(options, function onGetModules(error, results) {

            //forward error
            if (error) {
                next(error);
            }

            //handle response
            else {
                response.status(200);
                response.json(results);
            }

        });

});



/**
 * @api {post} /modules Create New Module
 * @apiVersion 0.1.0
 * @apiName PostModule
 * @apiGroup Module
 * @apiDescription Create new Module
 */
router.post(PATH_LIST, function postModule(request, response, next) {

    //obtain request body
    const body = _.merge({}, request.body);

    Module
        .post(body, function onPostModule(error, created) {

            //forward error
            if (error) {
                next(error);
            }

            //handle response
            else {
                response.status(201);
                response.json(created);
            }

        });

});



/**
 * @api {get} /modules/:id Get Existing Module
 * @apiVersion 0.1.0
 * @apiName GetModule
 * @apiGroup Module
 * @apiDescription Get existing Module
 */
router.get(PATH_SINGLE, function getModule(request, response, next) {

    //obtain request options
    const options = _.merge({}, request.mquery);

    //obtain Module id
    options._id = request.params.id;

    Module
        .getById(options, function onGetModule(error, found) {

            //forward error
            if (error) {
                next(error);
            }

            //handle response
            else {
                response.status(200);
                response.json(found);
            }

        });

});


/**
 * @api {patch} /modules/:id Patch Existing Module
 * @apiVersion 0.1.0
 * @apiName PatchModule
 * @apiGroup Module
 * @apiDescription Patch existing Module
 */
router.patch(PATH_SINGLE, function patchModule(request, response, next) {

    //obtain Module id
    const _id = request.params.id;

    //obtain request body
    const patches = _.merge({}, request.body);

    Module
        .patch(_id, patches, function onPatchModule(error, patched) {

            //forward error
            if (error) {
                next(error);
            }

            //handle response
            else {
                response.status(200);
                response.json(patched);
            }

        });

});



/**
 * @api {put} /modules/:id Put Existing Module
 * @apiVersion 0.1.0
 * @apiName PutModule
 * @apiGroup Module
 * @apiDescription Put existing Module
 */
router.put(PATH_SINGLE, function putModule(request, response, next) {

    //obtain Module id
    const _id = request.params.id;

    //obtain request body
    const updates = _.merge({}, request.body);

    Module
        .put(_id, updates, function onPutModule(error, updated) {

            //forward error
            if (error) {
                next(error);
            }

            //handle response
            else {
                response.status(200);
                response.json(updated);
            }

        });

});



/**
 * @api {delete} /modules/:id Delete Existing Module
 * @apiVersion 0.1.0
 * @apiName DeleteModule
 * @apiGroup Module
 * @apiDescription Delete existing Module
 */
router.delete(PATH_SINGLE, function deleteModule(request, response, next) {

    //obtain Module id
    const _id = request.params.id;

    Module
        .del(_id, function onDeleteModule(error, deleted) {

            //forward error
            if (error) {
                next(error);
            }

            //handle response
            else {
                response.status(200);
                response.json(deleted);
            }

        });

});



/**
 * @api {get} /modules/:Module/modules List Sub-modules
 * @apiVersion 0.1.0
 * @apiName GetSubModules
 * @apiGroup Module
 * @apiDescription Returns a list of sub-modules
 */
router.get(PATH_CHILDREN, function getSubModules(request, response, next) {

    //obtain request options
    const { Module } = request.params;
    const filter =
        (Module ? { filter: { Module: Module } } : {});
    const options = _.merge({}, filter, request.mquery);


    Module
        .get(options, function onGetSubModules(error, results) {

            //forward error
            if (error) {
                next(error);
            }

            //handle response
            else {
                response.status(200);
                response.json(results);
            }

        });

});



/* expose router */
module.exports = router;