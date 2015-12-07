/*
* NatureQuiz build tasks
*
*/
'use strict';

module.exports = function(grunt) {

    //var path = require('path');
    //var util = require('util');
    //var fs = require('fs');
    //var async = require('async');

    // TODO This shouldn't be hardcoded
    var natureQuizPath = '/home/hellenic/Development/Android/NatureQuiz';

    grunt.config.merge({
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: natureQuizPath + '/assets/images/',
                    src: ['**/*'],
                    dest: '<%= yeoman.client %>/assets/images/categories'
                }]
            }
        },
        convert: {
            options: {
                explicitArray: false,
            },
            xml2json: {
                // Copy category definitions
                files: [{
                    expand: true,
                    cwd: natureQuizPath + '/assets/categories/',
                    src: ['**/*.xml'],
                    dest: '<%= yeoman.client %>/assets/categories/',
                    ext: '.json'
                },
                // Copy localizations
                {
                    expand: true,
                    cwd: natureQuizPath + '/res/',
                    src: ['**/+(values|values-fi|values-ru)/*.xml'],
                    dest: '<%= yeoman.client %>/assets/localization/',
                    ext: '.json',
                    rename: function(dest, src) {
                        src = src.replace('values-ru', 'ru');
                        src = src.replace('values-fi', 'fi');
                        src = src.replace('values',    'en');
                        return dest + src;
                    }
                }]
            }
        },
        clean: {
            localization: ['<%= yeoman.client %>/assets/localization/**/application_*.json']
        },
        naturequiz: {
            options: {

            },
            categories: {
                src: ['<%= yeoman.client %>/assets/categories/*.json'],
                dest: '<%= yeoman.client %>/assets/categories/categories.json'
            }
        }
    });

    grunt.registerMultiTask('naturequiz', 'Manipulate and construct game JSON data', function() {

        var options = this.options({
            pretty: true,
            mergeAttrs: true,
            inline: 8,
            indent: 2
        });
        grunt.verbose.writeflags(options, 'Options');

        var categories = [];

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            var JSONs = f.src.filter(function(filepath) {

                // Don't use the dest file as src
                if (filepath === f.dest)
                    return false;

                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            var categoriesData = JSONs.map(function(filepath) {
                // Read file source.
                return {
                    file: filepath,
                    data: grunt.file.readJSON(filepath)
                };
            });

            var getCategoryIdFromFile = function(filepath)
            {
                var id = filepath.substring(filepath.lastIndexOf('/')+1);
                return  id.replace('.json', '');
            };

            // Construct categories summary from all the category datas
            for (var i=0; i<categoriesData.length; i++)
            {
                var categoryId = getCategoryIdFromFile(categoriesData[i].file);
                var categoryData = categoriesData[i].data.category;
                var category =  {};

                category.id = categoryId;
                category.name = categoryData.name;
                category.description = categoryData.description;
                category.link = categoryData.link;
                category.image = categoryData.image;
                category.levelCount = categoryData.levels.level.length;

                categories.push(category);
            }

            // Write the categories summary to dest file
            var jsonData = JSON.stringify(categories, null, options.indent);
            grunt.file.write(f.dest, jsonData);

            // Print a success message.
            grunt.log.ok('File ' + f.dest.cyan + ' created.' + ' OK'.green);
        });

    });

};
