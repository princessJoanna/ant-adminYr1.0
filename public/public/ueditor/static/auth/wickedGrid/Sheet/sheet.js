/**
 * @namespace
 * @type {Object}
 * @name jQuery()
 */
$.fn.extend({
    /**
     * @memberOf jQuery()
     * @function
     * @returns {jQuery()}
     * @description
     * <pre>
     * The jQuery.sheet plugin
     * Supports the following jQuery events
     *
     * sheetAddRow - occurs just after a row has been added
     *  arguments: e (jQuery event), jS, i (row index), isBefore, qty
     *      example:
     *          $(obj).sheet({
     *              sheetAddRow: function(e, jS, i, isBefore, qty) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetAddRow', function(e, jS, i, isBefore, qty) {
     *
     *          })
     *          .sheet();
     *
     * sheetAddColumn - occurs just after a column has been added
     *      arguments: e (jQuery event), jS, i (column index), isBefore, qty
     *      example:
     *          $(obj).sheet({
     *              sheetAddColumn: function(e, jS, i, isBefore, qty) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetAddColumn', function(e, jS, i, isBefore, qty) {
     *
     *          })
     *          .sheet();
     *
     * sheetSwitch - occurs after a spreadsheet has been switched
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), i (spreadsheet index)
     *      example:
     *          $(obj).sheet({
     *              sheetSwitch: function(e, jS, i) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetSwitch', function(e, jS, i) {
     *
     *          })
     *          .sheet();
     *
     * sheetRename - occurs just after a spreadsheet is renamed, to obtain new title jS.obj.table().attr('title');
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), i (spreadsheet index)
     *      example:
     *          $(obj).sheet({
     *              sheetRename: function(e, jS, i) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetRename', function(e, jS, i) {
     *
     *          })
     *          .sheet();
     *
     * sheetTabSortStart - occurs at the beginning of a sort for moving a spreadsheet around in order
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), E (jQuery sortable event), ui, (jQuery ui event)
     *      example:
     *          $(obj).sheet({
     *              sheetTabSortStart: function(e, jS, E, ui) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetTabSortStart',NPER: function(e, jS, E, ui) {
     *
     *          })
     *          .sheet();
     *
     * sheetTabSortUpdate - occurs after a sort of a spreadsheet has been completed
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), E (jQuery sotable event), ui, (jQuery ui event), i (original index)
     *      example:
     *          $(obj).sheet({
     *              sheetTabSortUpdate: function(e, jS, E, ui) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetTabSortUpdate', function(e, jS, E, ui) {
     *
     *          })
     *          .sheet();
     *
     * sheetFormulaKeydown - occurs just after keydown on either inline or static formula
     *      arguments: e (jQuery event)
     *      example:
     *          $(obj).sheet({
     *              sheetFormulaKeydown: function(e) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetFormulaKeydown') {
     *
     *          })
     *          .sheet();
     * sheetCellEdit - occurs just before a cell has been started to edit
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), cell (jQuery.sheet.instance.spreadsheet cell)
     *      example:
     *          $(obj).sheet({
     *              sheetCellEdit: function(e, jS, cell) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetCellEdit', function(e, jS, cell) {
     *
     *          })
     *          .sheet();
     *
     * sheetCellEdited - occurs just after a cell has been updated
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), cell (jQuery.sheet.instance.spreadsheet cell)
     *      example:
     *          $(obj).sheet({
     *              sheetCellEdited: function(e, jS, cell) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetCellEdited', function(e, jS, cell) {
     *
     *          })
     *          .sheet();
     *
     * sheetCalculation - occurs just after a spreadsheet has been fully calculated
     *      arguments: e (jQuery event), jS (jQuery.sheet instance)
     *      example:
     *          $(obj).sheet({
     *              sheetCalculation: function(e, jS) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetCalculation', function(e, jS) {
     *
     *          })
     *          .sheet();
     *
     * sheetAdd - occurs just after a spreadsheet has been added
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), i (new sheet index)
     *      example:
     *          $(obj).sheet({
     *              sheetAdd: function(e, jS, i) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetAdd', function(e, jS, i) {
     *
     *          })
     *          .sheet();
     *
     * sheetDelete - occurs just after a spreadsheet has been deleted
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), i (old sheet index)
     *      example:
     *          $(obj).sheet({
     *              sheetDelete: function(e, jS, i) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetDelete', function(e, jS, i) {
     *
     *          })
     *          .sheet();
     *
     * sheetDeleteRow - occurs just after a row has been deleted
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), i (old row index)
     *      example:
     *          $(obj).sheet({
     *              sheetDeleteRow: function(e, jS, i) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetDeleteRow', function(e, jS, i) {
     *
     *          })
     *          .sheet();
     *
     * sheetDeleteColumn - occurs just after a column as been deleted
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), i (old column index)
     *      example:
     *          $(obj).sheet({
     *              sheetDeleteColumn: function(e, jS, i) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetDeleteColumn', function(e, jS, i) {
     *
     *          })
     *          .sheet();
     *
     * sheetOpen - occurs just after a single sheet within a set of sheets has been opened, this is triggered when calling sheet, so it needs to be bound beforehand
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), i (new sheet index)
     *      example:
     *          $(obj).sheet({
     *              sheetOpen: function(e, jS, i) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetOpen', function(e, jS, i) {
     *
     *          })
     *          .sheet();
     *
     * sheetAllOpened - occurs just after all sheets have been loaded and complete user interface has been created, this is triggered when calling sheet, so it needs to be bound beforehand
     *      arguments: e (jQuery event), jS (jQuery.sheet instance)
     *      example:
     *          $(obj).sheet({
     *              sheetAllOpened: function(e, jS) {
     *
     *              }
     *          });
     *      or:
     *          $(obj).bind('sheetAllOpened', function(e, jS) {
     *
     *          })
     *          .sheet();
     *
     * sheetSave - an assistance event called when calling jS.toggleState(), but not tied to anything internally
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), tables (tables from spreadsheet)
     *      example:
     *          $(obj).sheet({
     *              sheetSave: function(e, jS, tables) {
     *
     *              });
     *          }
     *      or:
     *          $(obj).bind('sheetSave', function(e, jS, tables) {
     *
     *          })
     *          .sheet();
     *
     * sheetFullScreen - triggered when the sheet goes full screen
     *      arguments: e (jQuery event), jS (jQuery.sheet instance), isFullScreen (boolean, true if full screen, false if not)
     *      example:
     *          $(obj).sheet({
     *              sheetFullScreen: function(e, jS, isFullScreen) {
     *
     *              });
     *          }
     *      or:
     *          $(obj).bind('sheetFullScreen', function(e, jS, isFullScreen) {
     *
     *          })
     *          .sheet();
     * </pre>
     *
     * @param {Object} [settings] supports the following properties/methods:
     * <pre>
     * editable {Boolean}, default true, Makes the sheet editable or viewable
     *
     * editableNames {Boolean}, default true, Allows sheets to have their names changed, depends on settings.editable being true
     *
     * barMenus {Boolean}, default true, Turns bar menus on/off
     *
     * freezableCells {Boolean}, default true, Turns ability to freeze cells on/off
     *
     * allowToggleState {Boolean}, default true, allows the spreadsheet to be toggled from write/read
     *
     * newColumnWidth {Number}, default 120, width of new columns
     *
     * title {String|Function}, title of spreadsheet, if function, expects string and is sent jS
     *
     * menuRight {String|Function}, default '', 'this' is jQuery.sheet instance. If ul object, will attempt to create menu
     *
     * menuLeft {String|Function}, default '', 'this' is jQuery.sheet instance. If ul object, will attempt to create menu
     *
     * calcOff {Boolean} default false, turns turns off ability to calculate
     *
     * lockFormulas {Boolean} default false, turns on/off the ability to edit formulas
     *
     * colMargin {Number} default 18, size of height of new cells, and width of cell bars
     *
     * boxModelCorrection {Number} default 2, if box model is detected, it adds these pixels to ensure the size of the spreadsheet controls are correct
     *
     * formulaFunctions {Object} default {}, Additional functions for formulas. Will overwrite default functions if named the same.
     *      Javascript Example:
     *          $(obj).sheet({
     *              formulaFunctions: {
     *                  NEWFUNCTION: function(arg1, arg2) {
     *                      //this = the parser's cell object object
     *                      return 'string'; //can return a string
     *                      return { //can also return an object {value: '', html: ''}
     *                          value: 'my value seen by other cells or if accessed directly',
     *                          html: $('What the end user will see on the cell this is called in')
     *                      }
     *                  }
     *              }
     *          });
     *
     *      Formula Example:
     *          =NEWFUNCTION(A1:B1, C3);
     *
     * formulaVariables {Object} default {}, Additional variables that formulas can access.
     *      Javascript Example:
     *          $(obj).sheet({
     *              formulaVariables: {
     *                  newVariable: 100
     *              }
     *          });
     *
     *      Formula Example (will output 200)
     *          =newVariable + 100
     *
     * cellSelectModel {String} default 'excel', accepts 'excel', 'oo', or 'gdrive', makes the select model act differently
     *
     * autoAddCells {Boolean} default true, allows you to add cells by selecting the last row/column and add cells by pressing either tab (column) or enter (row)
     *
     * resizableCells {Boolean} default true, turns resizing on and off for cells, depends on jQuery ui
     *
     * resizableSheet {Boolean} default true, turns resizing on and off for sheet, depends on jQuery ui
     *
     * autoFiller {Boolean} default true, turns on/off the auto filler, the little square that follows the active cell around that you can drag and fill the values of other cells in with.
     *
     * minSize {Object} default {rows: 1, cols: 1}, the minimum size of a spreadsheet
     *
     * error {Function} default function(e) { return e.error; }, is triggered on errors from the formula engine
     *
     * encode {Function} default is a special characters handler for strings only, is a 1 way encoding of the html if entered manually by the editor.  If you want to use html with a function, return an object rather than a string
     *
     * frozenAt {Object} default [{row: 0,col: 0}], Gives the ability to freeze cells at a certain row/col
     *
     * contextmenuTop {Object} default is standard list of commands for context menus when right click or click on menu dropdown
     *      Javascript example:
     *          {
     *              "What I want my command to say": function() {}
     *          }
     *
     * contextmenuLeft {Object} default is standard list of commands for context menus when right click
     *      Javascript example:
     *          {
     *              "What I want my command to say": function() {}
     *          }
     *
     * contextmenuCell {Object} default is standard list of commands for context menus when right click or click on menu dropdown
     *      Javascript example:
     *          {
     *              "What I want my command to say": function() {}
     *          }
     *
     * hiddenRows {Array} default [], Hides certain rows from being displayed initially. [sheet Index][row index]. example: [[1]] hides first row in first spreadsheet; [[]],[1]] hides first row in second spreadsheet
     *
     * hiddenColumns {Array} default [], Hides certain columns from being displayed initially. [sheet Index][column index]. example: [[1]] hides first column in first spreadsheet; [[],[1]] hides first column in second spreadsheet
     *
     * alert {Function} default function(msg) {alert(msg);}
     * prompt {Function} default function(msg, callback, initialValue) {callback(prompt(msg, initialValue));}
     * confirm {Function} default
     *      function(msg, callbackIfTrue, callbackIfFalse) {
     *          if (confirm(msg)) {
     *              callbackIfTrue();
     *          } else if (callbackIfFalse) {
     *              callbackIfFalse();
     *          }
     *      }
     * </pre>
     *
     * initCalcRows {Number} default 40
     * initCalcCols {Number} default 20
     */
    sheet:function (settings) {
        var n = isNaN,
            events = $.sheet.events;

        settings = settings || {};

        $(this).each(function () {
            var globalize = Globalize,
                me = $(this),
                defaults = {
                    editable:true,
                    editableNames:true,
                    barMenus:true,
                    freezableCells:true,
                    allowToggleState:true,
                    menuLeft:null,
                    menuRight:null,
                    newColumnWidth:120,
                    title:null,
                    calcOff:false,
                    lockFormulas:false,
                    parent:me,
                    colMargin:18,
                    boxModelCorrection:2,
                    formulaFunctions:{},
                    formulaVariables:{},
                    cellSelectModel:'excel',
                    autoAddCells:true,
                    resizableCells:true,
                    resizableSheet:true,
                    autoFiller:true,
                    minSize:{rows:1, cols:1},
                    error:function (e) {
                        return e.error;
                    },
                    endOfNumber: false,
                    encode:function (val) {

                        switch (typeof val) {
                            case 'object':
                                //check if it is a date
                                if (val.getMonth) {
                                    return globalize.format(val, 'd');
                                }

                                return val;
                        }

                        if (!val) {
                            return val || '';
                        }
                        if (!val.replace) {
                            return val || '';
                        }
                        /*var num = $.trim(val) * 1;
                         if (!isNaN(num)) {
                         return globalize.format(num, "n10").replace(this.endOfNumber, function (orig, radix, num) {
                         return (num ? radix : '') + (num || '');
                         });
                         }*/

                        return val
                            .replace(/&/gi, '&amp;')
                            .replace(/>/gi, '&gt;')
                            .replace(/</gi, '&lt;')
                            .replace(/\n/g, '\n<br>')
                            .replace(/\t/g, '&nbsp;&nbsp;&nbsp ')
                            .replace(/  /g, '&nbsp; ');
                    },
                    frozenAt:[],
                    contextmenuTop:{
                        "Toggle freeze columns to here":function (jS) {
                            var col = jS.getTdLocation(jS.obj.tdActive()).col,
                                actionUI = jS.obj.pane().actionUI;
                            actionUI.frozenAt.col = (actionUI.frozenAt.col == col ? 0 : col);
                        },
                        "Insert column after":function (jS) {
                            jS.controlFactory.addColumn(jS.colLast);
                            return false;
                        },
                        "Insert column before":function (jS) {
                            jS.controlFactory.addColumn(jS.colLast, true);
                            return false;
                        },
                        "Add column to end":function (jS) {
                            jS.controlFactory.addColumn();
                            return false;
                        },
                        "Delete this column":function (jS) {
                            jS.deleteColumn();
                            return false;
                        },
                        "Hide column":function (jS) {
                            jS.toggleHideColumn();
                            return false;
                        }
                    },
                    contextmenuLeft:{
                        "Toggle freeze rows to here":function (jS) {
                            var row = jS.getTdLocation(jS.obj.tdActive()).row,
                                actionUI = jS.obj.pane().actionUI;
                            actionUI.frozenAt.row = (actionUI.frozenAt.row == row ? 0 : row);
                        },
                        "Insert row after":function (jS) {
                            jS.controlFactory.addRow(jS.rowLast);
                            return false;
                        },
                        "Insert row before":function (jS) {
                            jS.controlFactory.addRow(jS.rowLast, true);
                            return false;
                        },
                        "Add row to end":function (jS) {
                            jS.controlFactory.addRow();
                            return false;
                        },
                        "Delete this row":function (jS) {
                            jS.deleteRow();
                            return false;
                        },
                        "Hide row":function (jS) {
                            jS.toggleHide.row();
                            return false;
                        }
                    },
                    contextmenuCell:{
                        "Copy":false,
                        "Cut":false,
                        "Insert column after":function (jS) {
                            jS.controlFactory.addColumn(jS.colLast);
                            return false;
                        },
                        "Insert column before":function (jS) {
                            jS.controlFactory.addColumn(jS.colLast, true);
                            return false;
                        },
                        "Add column to end":function (jS) {
                            jS.controlFactory.addColumn();
                            return false;
                        },
                        "Delete this column":function (jS) {
                            jS.deleteColumn();
                            return false;
                        },
                        "line1":"line",
                        "Insert row after":function (jS) {
                            jS.controlFactory.addRow(jS.rowLast);
                            return false;
                        },
                        "Insert row before":function (jS) {
                            jS.controlFactory.addRow(jS.rowLast, true);
                            return false;
                        },
                        "Add row to end":function (jS) {
                            jS.controlFactory.addRow();
                            return false;
                        },
                        "Delete this row":function (jS) {
                            jS.deleteRow();
                            return false;
                        },
                        "line2":'line',
                        "Add spreadsheet":function (jS) {
                            jS.addSheet();
                        },
                        "Delete spreadsheet":function (jS) {
                            jS.deleteSheet();
                        }
                    },
                    hiddenRows:[],
                    hiddenColumns:[],
                    cellStartingHandlers: {
                        '$':function(val, ch) {
                            return jFN.DOLLAR.call(this, val.substring(1).replace(globalize.culture().numberFormat[','], ''), 2, ch || '$');
                        },
                        '£':function(val) {
                            return jS.s.cellStartingHandlers['$'].call(this, val, '£');
                        }
                    },
                    cellEndHandlers: {
                        '%': function(value) {
                            return value.substring(0, this.value.length - 1) / 100;
                        }
                    },
                    cellTypeHandlers: {
                        percent: function(value) {
                            var num = (n(value) ? globalize.parseFloat(value) : value * 1),
                                result;

                            if (!n(num)) {//success
                                result = new Number(num);
                                result.html = globalize.format(num, 'p');
                                return result;
                            }

                            return value;
                        },
                        date: function(value) {
                            var date = globalize.parseDate(value);
                            date.html = globalize.format(date, 'd');
                            return date;
                        },
                        time: function(value) {
                            var date = globalize.parseDate(value);
                            date.html = globalize.format(date, 't');
                            return date;
                        },
                        currency: function(value) {
                            var num = (n(value) ? globalize.parseFloat(value) : value * 1),
                                result;

                            if (!n(num)) {//success
                                result = new Number(num);
                                result.html = globalize.format(num, 'c');
                                return result;
                            }

                            return value;
                        },
                        number: function(value) {
                            var radix, result;
                            if (!settings.endOfNumber) {
                                radix = globalize.culture().numberFormat['.'];
                                settings.endOfNumber = new RegExp("([" + (radix == '.' ? "\." : radix) + "])([0-9]*?[1-9]+)?(0)*$");
                            }

                            if (!n(value)) {//success
                                result = new Number(value);
                                result.html = globalize.format(value + '', "n10")
                                    .replace(settings.endOfNumber, function (orig, radix, num) {
                                        return (num ? radix : '') + (num || '');
                                    });
                                return result;
                            }

                            return value;
                        }
                    },
                    alert: function(msg) {
                        alert(msg);
                    },
                    prompt: function(msg, callback, initialValue) {
                        callback(prompt(msg, initialValue));
                    },
                    confirm: function(msg, callbackIfTrue, callbackIfFalse) {
                        if (confirm(msg)) {
                            callbackIfTrue();
                        } else if (callbackIfFalse) {
                            callbackIfFalse();
                        }
                    },
                    initCalcRows: 40,
                    initCalcCols: 20
                };

            //destroy already existing spreadsheet
            var jS = this.jS;
            if (jS) {
                var tables = me.children().detach();
                jS.kill();
                me.html(tables);

                for (var event in events) {
                    if (settings[events[event]]) {
                        me.unbind(events[event]);
                    }
                }
            }

            if ((this.className || '').match(/\bnotEditable\b/i) != null) {
                settings['editable'] = false;
            }

            for (var i in events) {
                if (settings[events[i]]) me.bind(events[i], settings[events[i]]);
            }

            if (!$.sheet.instance.length) $.sheet.instance = [];

            this.jS = jS = $.sheet.createInstance($.extend(defaults, settings), $.sheet.instance.length);
            $.sheet.instance.push(jS);
        });
        return this;
    },

    /**
     * @memberOf jQuery()
     * @method
     * @returns {HTMLElement}
     */
    disableSelectionSpecial:function () {
        this.each(function () {
            this.onselectstart = function () {
                return false;
            };
            this.unselectable = "on";
            this.style['-moz-user-select'] = 'none';
        });
        return this;
    },

    /**
     * @memberOf jQuery()
     * @returns {jS}
     */
    getSheet:function () {
        var me = this[0],
            jS = (me.jS || {});
        return jS;
    },

    /**
     * Get cell value
     * @memberOf jQuery()
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Number} [sheetIndex] defaults to 0
     * @returns {String|Date|Number|Boolean|Null}
     */
    getCellValue:function (rowIndex, colIndex, sheetIndex) {
        var me = this[0],
            jS = (me.jS || {});

        sheetIndex = (sheetIndex || 0);

        if (jS.updateCellValue) {
            try {
                return jS.updateCellValue(sheetIndex, rowIndex, colIndex);
            } catch (e) {}
        }
        return null;
    },

    /**
     * Set cell value
     * @memberOf jQuery()
     * @param {String|Number} value
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Number} [sheetIndex] defaults to 0
     * @returns {Boolean}
     */
    setCellValue:function (value, rowIndex, colIndex, sheetIndex) {
        var me = this[0],
            jS = (me.jS || {}),
            cell;

        sheetIndex = (sheetIndex || 0);

        if (
            jS.getCell
                && (cell = jS.getCell(rowIndex, colIndex, sheetIndex))
            ) {
            try {
                if ((value + '').charAt(0) == '=') {
                    cell.valueOverride = cell.value = '';
                    cell.formula = value.substring(1);
                } else {
                    cell.value = value;
                    cell.valueOverride = cell.formula = '';
                }
                cell.calcLast = cell.calcDependenciesLast = 0;
                jS.updateCellValue.call(cell);
                jS.updateCellDependencies.call(cell);
                return true;
            } catch (e) {}
        }
        return false;
    },

    /**
     * Set cell formula
     * @memberOf jQuery()
     * @param {String} formula
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Number} [sheetIndex] defaults to 0
     * @returns {Boolean}
     */
    setCellFormula:function (formula, rowIndex, colIndex, sheetIndex) {
        var me = this[0],
            jS = (me.jS || {}),
            cell;

        sheetIndex = (sheetIndex || 0);

        if (
            jS.getCell
                && (cell = jS.getCell(rowIndex, colIndex, sheetIndex))
            ) {
            try {
                cell.formula = formula;
                cell.valueOverride = cell.value = '';
                cell.calcLast = cell.calcDependenciesLast = 0;
                jS.updateCellValue(sheetIndex, rowIndex, colIndex);
            } catch (e) {}
        }
        return this;
    },

    /**
     * Set cell html
     * @memberOf jQuery()
     * @param {*} html
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Number} [sheetIndex] defaults to 0
     */
    setCellHtml:function (html, rowIndex, colIndex, sheetIndex) {
        var me = this[0],
            jS = (me.jS || {}),
            cell;

        sheetIndex = (sheetIndex || 0);

        if (
            jS.getCell
                && (cell = jS.getCell(rowIndex, colIndex, sheetIndex))
            ) {
            try {
                cell.html = [html];
                cell.calcLast = cell.calcDependenciesLast = 0;
                jS.updateCellValue(sheetIndex, rowIndex, colIndex);
            } catch (e) {}
        }
        return this;
    },

    /**
     * Detect if spreadsheet is full screen
     * @memberOf jQuery()
     * @returns {Boolean}
     */
    isSheetFullScreen:function () {
        var me = this[0],
            jS = (me.jS || {});

        if (jS.obj) {
            return jS.obj.fullScreen().is(':visible');
        }
        return false;
    },

    /**
     * Get inputs serialized from spreadsheet type_sheet-index_row-index_column-index_instance-index (dropdown_0_1_1_0 = sheet 1, row 1, column A, instance 0
     * @param {Boolean} [isArray] return serialized as array (true) or string (false, default false
     * @memberOf jQuery()
     * @returns {*}
     */
    serializeCellInputs:function (isArray) {
        var me = this[0],
            jS = (me.jS || {}),
            inputs = jS.obj.tables().find(':input');

        if (isArray) {
            return inputs.serializeArray();
        } else {
            return inputs.serialize();
        }
    },

    /**
     * prints the source of a sheet for a user to see
     * @param {Boolean} [pretty] makes html a bit easier for the user to see
     * @returns {String}
     * @memberOf jQuery()
     */
    viewSource:function (pretty) {
        var source = "";
        $(this).each(function () {
            if (pretty) {
                source += $(this).toPrettySource();
            } else {
                source += $(this).toCompactSource();
            }
        });
        $.print(source);

        return source;
    },

    /**
     * prints html to 1 line
     * @returns {String}
     * @memberOf jQuery()
     */
    toCompactSource:function () {
        var node = this[0];
        var result = "";
        if (node.nodeType == 1) {
            // ELEMENT_NODE
            result += "<" + node.tagName.toLowerCase();

            var n = node.attributes.length;
            for (var i = 0; i < n; i++) {
                var key = node.attributes[i].name,
                    val = node.getAttribute(key);

                if (val) {
                    if (key == "contentEditable" && val == "inherit") {
                        continue;
                        // IE hack.
                    }

                    if (typeof(val) == "string") {
                        result += " " + key + '="' + val.replace(/"/g, "'") + '"';
                    } else if (key == "style" && val.cssText) {
                        result += ' style="' + val.cssText + '"';
                    }
                }
            }

            if (node.tagName == "COL") {
                // IE hack, which doesn't like <COL..></COL>.
                result += '/>';
            } else {
                result += ">";
                var childResult = "";
                $(node.childNodes).each(function () {
                    childResult += $(this).toCompactSource();
                });
                result += childResult;
                result += "</" + node.tagName.toLowerCase() + ">";
            }

        } else if (node.nodeType == 3) {
            // TEXT_NODE
            result += node.data.replace(/^\s*(.*)\s*$/g, "$1");
        }
        return result;
    },

    /**
     *  prints html to many lines, formatted for easy viewing
     * @param {String} [prefix]
     * @returns {String}
     * @memberOf jQuery()
     */
    toPrettySource:function (prefix) {
        var node = this[0],
            n,
            i;
        prefix = prefix || "";

        var result = "";
        if (node.nodeType == 1) {
            // ELEMENT_NODE
            result += "\n" + prefix + "<" + node.tagName.toLowerCase();
            n = node.attributes.length;
            for (i = 0; i < n; i++) {
                var key = node.attributes[i].name,
                    val = node.getAttribute(key);

                if (val) {
                    if (key == "contentEditable" && val == "inherit") {
                        continue; // IE hack.
                    }
                    if (typeof(val) == "string") {
                        result += " " + key + '="' + $.trim(val.replace(/"/g, "'")) + '"';
                    } else if (key == "style" && val.cssText) {
                        result += ' style="' + $.trim(val.cssText) + '"';
                    }
                }
            }
            if (node.childNodes.length <= 0) {
                if (node.tagName == "COL") {
                    result += "/>";
                } else {
                    result += "></" + node.tagName.toLowerCase() + ">";
                }
            } else {
                result += ">";
                var childResult = "";

                n = node.childNodes.length;

                for (i = 0; i < n; i++) {
                    childResult += $(node.childNodes[i]).toPrettySource(prefix + "  ");
                }
                result += childResult;
                if (childResult.indexOf('\n') >= 0) {
                    result += "\n" + prefix;
                }
                result += "</" + node.tagName.toLowerCase() + ">";
            }
        } else if (node.nodeType == 3) {
            // TEXT_NODE
            result += node.data.replace(/^\s*(.*)\s*$/g, "$1");
        }
        return result;
    }
});

/**
 * @namespace
 * @type {Object}
 * @memberOf jQuery
 * @name jQuery.sheet
 */
$.sheet = {
    /**
     * Array of instances of jQuery.sheet, generally short-handed to jS
     * @memberOf jQuery.sheet
     */
    instance:[],

    /**
     * Contains the dependencies if you use $.sheet.preLoad();
     * @memberOf jQuery.sheet
     */
    dependencies:{
        coreCss:{css:'jquery.sheet.css'},

        formulaParser:{script:'parser/formula/formula.js'},
        tsvParser:{script:'parser/tsv/tsv.js'},

        jQueryUI:{script:'jquery-ui/jquery-ui.js', thirdParty:true},
        jQueryUIThemeRoller:{css:'jquery-ui/themes/smoothness/jquery-ui.css', thirdParty:true},

        globalize:{script:'globalize/lib/globalize.js', thirdParty:true},

        nearest:{script:'jquery-nearest/src/jquery.nearest.js', thirdParty:true},

        mousewheel:{script:'MouseWheel/MouseWheel.js', thirdParty:true}
    },

    /**
     * Contains the optional plugins if you use $.sheet.preLoad();
     * @memberOf jQuery.sheet
     */
    optional:{
        //native
        advancedFn:{script:'plugins/jquery.sheet.advancedfn.js'},
        dts:{script:'plugins/jquery.sheet.dts.js'},
        financeFn:{script:'plugins/jquery.sheet.financefn.js'},

        //3rd party
        colorPicker:{
            css:'really-simple-color-picker/colorPicker.css',
            script:'really-simple-color-picker/jquery.colorPicker.js',
            thirdParty:true
        },

        elastic:{script:'jquery-elastic/jquery.elastic.source.js', thirdParty:true},

        globalizeCultures:{script:'globalize/lib/cultures/globalize.cultures.js', thirdParty:true},

        raphael:{script:'raphael/raphael.js', thirdParty:true},
        gRaphael:{script:'graphael/g.raphael.js', thirdParty:true},
        gRaphaelBar:{script:'graphael/g.bar.js', thirdParty:true},
        gRaphaelDot:{script:'graphael/g.dot.js', thirdParty:true},
        gRaphaelLine:{script:'graphael/g.line.js', thirdParty:true},
        gRaphaelPie:{script:'graphael/g.pie.js', thirdParty:true},

        undoManager:{script: 'Javascript-Undo-Manager/js/undomanager.js', thirdParty:true},

        zeroClipboard:{script:'zeroclipboard/dist/ZeroClipboard.js', thirdParty:true}
    },

    /**
     * events list
     * @memberOf jQuery.sheet
     */
    events:[
        'sheetAddRow',
        'sheetAddColumn',
        'sheetSwitch',
        'sheetRename',
        'sheetTabSortStart',
        'sheetTabSortUpdate',
        'sheetCellEdit',
        'sheetCellEdited',
        'sheetCalculation',
        'sheetAdd',
        'sheetDelete',
        'sheetDeleteRow',
        'sheetDeleteColumn',
        'sheetOpen',
        'sheetAllOpened',
        'sheetSave',
        'sheetFullScreen',
        'sheetFormulaKeydown'
    ],

    /**
     * Used to load in all the required plugins and dependencies needed by sheet in it's default directories.
     * @param {String} [path] path
     * @param {Object} settings
     * @memberOf jQuery.sheet
     *
     */
    preLoad:function (path, settings) {
        path = path || '';
        settings = $.extend({
            skip: ['globalizeCultures'],
            thirdPartyDirectory: 'bower_components/'
        },settings);


        var write = function () {
            if (this.script !== undefined) {
                document.write('<script src="' + path + (this.thirdParty ? settings.thirdPartyDirectory : '') + this.script + '"></script>');
            }
            if (this.css !== undefined) {
                document.write('<link rel="stylesheet" type="text/css" href="' + path + (this.thirdParty ? settings.thirdPartyDirectory : '') + this.css + '"></link>');
            }
        };

        for(var i in settings.skip) {
            if (this.dependencies[settings.skip[i]]) {
                delete this.dependencies[settings.skip[i]];
            }
            if (this.optional[settings.skip[i]]) {
                delete this.optional[settings.skip[i]];
            }
        }

        $.each(this.dependencies, function () {
            write.call(this);
        });

        $.each(this.optional, function () {
            write.call(this);
        });
    },

    /**
     * The instance creator of jQuery.sheet
     * @memberOf jQuery.sheet
     * @param {Object} s settings from jQuery.fn.sheet
     * @param {Number} I the index of the instance
     * @returns {jS} jS jQuery sheet instance
     */
    createInstance:function (s, I) {

        var self = this,
        //create function, it expects 2 values.
            insertAfter = function (newElement, targetElement) {
                //target is what you want it to go after. Look for this elements parent.
                var parent = targetElement.parentNode;

                //if the parents lastchild is the targetElement...
                if(parent.lastchild == targetElement) {
                    //add the newElement after the target element.
                    parent.appendChild(newElement);
                } else {
                    // else the target has siblings, insert the new element between the target and it's next sibling.
                    parent.insertBefore(newElement, targetElement.nextSibling);
                }
            },
            $window = $(window),
            $document = $(document),
            body = document.body,
            $body = $(body),
            emptyFN = function () {},
            u = undefined,
            math = Math,
            n = isNaN,
            nAN = NaN,
            jSCellRange = function(cells) {
                this.cells = cells || [];
            },
            jSCP = jSCellRange.prototype = {
                clone: function() {
                    var clones = [];
                    for(var i = 0; i < this.cells.length;i++) {
                        var cell = this.cells[i],
                            clone = {
                                value:cell.value,
                                formula:cell.formula,
                                td: cell.td,
                                dependencies: cell.dependencies,
                                needsUpdated: cell.needsUpdated,
                                calcCount: cell.calcCount,
                                sheet: cell.sheet,
                                calcLast: cell.calcLast,
                                html: cell.html,
                                state: cell.state,
                                jS: cell.jS,
                                calcDependenciesLast: cell.calcDependenciesLast,
                                style: cell.style || cell.td.attr('style') || '',
                                cl: cell.cl || cell.td.attr('class') || ''
                            };
                        clones.push(clone);
                    }
                    return new jSCellRange(clones);
                }
            },

            /**
             * A single instance of a spreadsheet, shorthand, also accessible from jQuery.sheet.instance[index].
             * Generally called by jQuery().sheet().  Exposed for the ability to override methods if needed
             * @namespace
             * @alias jQuery.sheet.instance[]
             * @name jS
             */
            jS = {
                /**
                 * Current version of jQuery.sheet
                 * @memberOf jS
                 * @type {String}
                 */
                version:'4.x',

                /**
                 * The active sheet index within the a set of sheets
                 * @memberOf jS
                 * @type {Number}
                 */
                i:0,

                /**
                 * The instance index
                 * @memberOf jS
                 * @type {Number}
                 */
                I:I,

                /**
                 * The current count of sheet's within the instance
                 * @memberOf jS
                 * @type {Number}
                 */
                sheetCount:0,

                /**
                 * The internal storage array of the spreadsheets for an instance, constructed as array 3 levels deep, spreadsheet, rows, cells, can easily be used for custom exporting/saving
                 * @memberOf jS
                 * @type {Array}
                 */
                spreadsheets:[],

                /**
                 * Internal storage array of controls for an instance
                 * @memberOf jS
                 */
                controls:{
                    autoFiller:[],
                    bar:{
                        helper:[],
                        corner:[],
                        x:{
                            controls:[],
                            handleFreeze:[],
                            menu:[],
                            menuParent:[],
                            parent:[],
                            td:[],
                            tds:function () {
                                var tds = $([]);
                                for (var i in this.td[jS.i]) {
                                    tds.pushStack(this.td[jS.i][i]);
                                }
                                return tds;
                            }
                        },
                        y:{
                            controls:[],
                            handleFreeze:[],
                            menu:[],
                            parent:[],
                            td:[],
                            tds:function () {
                                var tds = $([]);
                                for (var i in this.td[jS.i]) {
                                    tds.pushStack(this.td[jS.i][i]);
                                }
                                return tds;
                            }
                        }
                    },
                    barMenuLeft:[],
                    barMenuTop:[],
                    barLeft:[],
                    barTop:[],
                    barTopParent:[],
                    chart:[],
                    tdMenu:[],
                    cellsEdited:[],
                    enclosure:[],
                    enclosures:null,
                    formula:null,
                    fullScreen:null,
                    header:null,
                    inPlaceEdit:[],
                    inputs:[],
                    label:null,
                    menuLeft:[],
                    menuRight:[],
                    menus:[],
                    pane:[],
                    panes:null,
                    scrolls:null,
                    sheetAdder:null,
                    table:[],
                    tables:null,
                    tab:[],
                    tabContainer:null,
                    tabs:null,
                    title:null,
                    toggleHide:{
                        x:[],
                        y:[]
                    },
                    ui:null
                },

                /**
                 * Object selectors for interacting with a spreadsheet, dynamically id'd from both sheet index and instance index
                 * @memberOf jS
                 * @type {Object}
                 */
                obj:{
                    autoFiller:function () {
                        return jS.controls.autoFiller[jS.i] || $([]);
                    },
                    barCorner:function () {
                        return jS.controls.bar.corner[jS.i] || $([]);
                    },
                    barHelper:function () {
                        return jS.controls.bar.helper[jS.i] || (jS.controls.bar.helper[jS.i] = $([]));
                    },
                    barLeft:function (i) {
                        return (jS.controls.bar.y.td[jS.i] && jS.controls.bar.y.td[jS.i][i] ? jS.controls.bar.y.td[jS.i][i] : $([]));
                    },
                    barLeftControls:function () {
                        return jS.controls.bar.y.controls[jS.i] || $([]);
                    },
                    barLefts:function () {
                        return jS.controls.bar.y.tds();
                    },
                    barHandleFreezeLeft:function () {
                        return jS.controls.bar.y.handleFreeze[jS.i] || $([]);
                    },
                    barMenuLeft:function () {
                        return jS.controls.bar.y.menu[jS.i] || $([]);
                    },
                    barTop:function (i) {
                        return (jS.controls.bar.x.td[jS.i] && jS.controls.bar.x.td[jS.i][i] ? jS.controls.bar.x.td[jS.i][i] : $([]));
                    },
                    barTopControls:function () {
                        return jS.controls.bar.x.controls[jS.i] || $([]);
                    },
                    barTops:function () {
                        return jS.controls.bar.x.tds();
                    },
                    barTopParent:function () {
                        return jS.controls.bar.x.parent[jS.i] || $([]);
                    },
                    barHandleFreezeTop:function () {
                        return jS.controls.bar.x.handleFreeze[jS.i] || $([]);
                    },
                    barMenuParentTop:function () {
                        return jS.controls.bar.x.menuParent[jS.i] || $([]);
                    },
                    barMenuTop:function () {
                        return jS.controls.bar.x.menu[jS.i] || $([]);
                    },
                    tdActive:function () {
                        return jS.cellLast.td || $([]);
                    },
                    tdMenu:function () {
                        return jS.controls.tdMenu[jS.i] || $([]);
                    },
                    cellsEdited: function () {
                        return jS.controls.cellsEdited[jS.i] || $([]);
                    },
                    chart:function () {
                        return jS.controls.chart[jS.i] || $([]);
                    },
                    enclosure:function () {
                        return jS.controls.enclosure[jS.i] || $([]);
                    },
                    enclosures:function () {
                        return jS.controls.enclosures || $([]);
                    },
                    formula:function () {
                        return jS.controls.formula || $([]);
                    },
                    fullScreen:function () {
                        return jS.controls.fullScreen || $([]);
                    },
                    header:function () {
                        return jS.controls.header || $([]);
                    },
                    highlighted: function() {
                        return jS.highlightedLast.obj || $([]);
                    },
                    menuRight:function () {
                        return jS.controls.menuRight[jS.i] || $([]);
                    },
                    inPlaceEdit:function () {
                        return jS.controls.inPlaceEdit[jS.i] || $([]);
                    },
                    inputs:function() {
                        return jS.controls.inputs[jS.i] || $([]);
                    },
                    label:function () {
                        return jS.controls.label || $([]);
                    },
                    menus:function() {
                        return jS.controls.menus[jS.i] || $([]);
                    },
                    menuLeft:function () {
                        return jS.controls.menuLeft[jS.i] || $([]);
                    },
                    pane:function () {
                        return jS.controls.pane[jS.i] || {};
                    },
                    panes:function () {
                        return jS.controls.panes || $([]);
                    },
                    parent:function () {
                        return s.parent;
                    },
                    scrolls:function () {
                        return jS.controls.scrolls || $([]);
                    },
                    sheetAdder:function () {
                        return jS.controls.sheetAdder || $([]);
                    },
                    table:function () {
                        return jS.controls.table[jS.i] || $([]);
                    },
                    tables:function () {
                        return jS.controls.tables || $([]);
                    },
                    tab:function () {
                        return jS.controls.tab[jS.i] || $([]);
                    },
                    tabs:function () {
                        return jS.controls.tabs || $([]);
                    },
                    tabContainer:function () {
                        return jS.controls.tabContainer || $([]);
                    },
                    title:function () {
                        return jS.controls.title || $([]);
                    }
                },

                /**
                 * Internal id's of table, used for scrolling and a few other things
                 * @memberOf jS
                 * @type {String}
                 */
                id:'jS_' + I + '_',

                /**
                 * Internal css classes of objects
                 * @memberOf jS
                 * @type {Object}
                 */
                cl:{
                    autoFiller:'jSAutoFiller',
                    autoFillerHandle:'jSAutoFillerHandle',
                    autoFillerCover:'jSAutoFillerCover',
                    barCorner:'jSBarCorner',
                    barController:'jSBarController',
                    barHelper:'jSBarHelper',
                    barLeft:'jSBarLeft',
                    barHandleFreezeLeft:'jSBarHandleFreezeLeft',
                    barTop:'jSBarTop',
                    barTopMenuButton: 'jSBarTopMenuButton',
                    barHandleFreezeTop:'jSBarHandleFreezeTop',
                    barTopParent:'jSBarTopParent',
                    chart:'jSChart',
                    formula:'jSFormula',
                    formulaParent:'jSFormulaParent',
                    header:'jSHeader',
                    fullScreen:'jSFullScreen',
                    inPlaceEdit:'jSInPlaceEdit',
                    menu:'jSMenu',
                    menuFixed:'jSMenuFixed',
                    parent:'jSParent',
                    scroll:'jSScroll',
                    sheetAdder: 'jSSheetAdder',
                    table:'jS',
                    label:'jSLoc',
                    pane:'jSEditPane',
                    tab:'jSTab',
                    tabContainer:'jSTabContainer',
                    tdMenu:'jSTdMenu',
                    title:'jSTitle',
                    enclosure:'jSEnclosure',
                    ui:'jSUI',
                    uiAutoFiller:'ui-state-active',
                    uiBar:'ui-widget-header',
                    uiBarHighlight:'ui-state-active',
                    uiBarHandleFreezeLeft:'ui-state-default',
                    uiBarHandleFreezeTop:'ui-state-default',
                    uiBarMenuTop:'ui-state-default',
                    uiTdActive:'ui-state-active',
                    uiTdHighlighted:'ui-state-highlight',
                    uiControl:'ui-widget-header ui-corner-top',
                    uiControlTextBox:'ui-widget-content',
                    uiFullScreen:'ui-widget-content ui-corner-all',
                    uiInPlaceEdit:'ui-state-highlight',
                    uiMenu:'ui-widget-header',
                    uiMenuUl:'ui-widget-header',
                    uiMenuLi:'ui-widget-header',
                    uiPane: 'ui-widget-content',
                    uiParent:'ui-widget-content ui-corner-all',
                    uiTable:'ui-widget-content',
                    uiTab:'ui-widget-header',
                    uiTabActive:'ui-state-highlight'
                },

                /**
                 * Messages for user interface
                 * @memberOf jS
                 * @type {Object}
                 */
                msg:{
                    addRowMulti:"How many rows would you like to add?",
                    addColumnMulti:"How many columns would you like to add?",
                    cellFind:"What are you looking for in this spreadsheet?",
                    cellNoFind:"No results found.",
                    dragToFreezeCol:"Drag to freeze column",
                    dragToFreezeRow:"Drag to freeze row",
                    addSheet:"Add a spreadsheet",
                    openSheet:"Are you sure you want to open a different sheet?  All unsaved changes will be lost.",
                    toggleHideRow:"No row selected.",
                    toggleHideColumn:"No column selected.",
                    loopDetected:"Loop Detected",
                    newSheetTitle:"What would you like the sheet's title to be?",
                    notFoundColumn:"Column not found",
                    notFoundRow:"Row not found",
                    notFoundSheet:"Sheet not found",
                    setCellRef:"Enter the name you would like to reference the cell by.",
                    sheetTitleDefault:"Spreadsheet {index}",
                    maxRowsBrowserLimitation:"You've reached the maximum amount of rows this browser supports. Try using Chrome, FireFox, or Internet Explorer 9+",
                    maxColsBrowserLimitation:"You've reached the maximum amount of columns this browser supports. Try using Chrome, FireFox, or Internet Explorer 9+",
                    maxSizeBrowserLimitationOnOpen:"The spreadsheet you are loading is larger than the maximum size of cells this browser supports. Try using Chrome, Firefox, or Internet Explorer 9+. You can an proceed, but the spreadsheet may not work as intended."
                },

                /**
                 * Deletes a jQuery sheet instance
                 * @memberOf jS
                 */
                kill:function () {
                    if (!jS) {
                        return false;
                    }
                    $(document).unbind('keydown');
                    this.obj.fullScreen().remove();
                    (this.obj.inPlaceEdit().destroy || emptyFN)();
                    s.parent
                        .trigger('sheetKill')
                        .removeClass(jS.cl.uiParent)
                        .html('');

                    s.parent[0].jS = u;

                    this.obj.menus().remove();

                    var max = $.sheet.events.length;
                    for (var i = 0; i < max; i++) {
                        s.parent.unbind($.sheet.events[i]);
                    }

                    $.sheet.instance.splice(I, 1);
                    return true;
                },

                /**
                 * Event trigger for jQuery sheet, wraps jQuery's trigger event to always return jS
                 * @param {String} eventType event type
                 * @param {Array} [extraParameters]
                 * @memberOf jS
                 */
                trigger:function (eventType, extraParameters) {
                    //wrapper for $ trigger of parent, in case of further mods in the future
                    extraParameters = extraParameters || [];
                    return s.parent.triggerHandler(eventType, [jS].concat(extraParameters));
                },

                /**
                 * Returns all spreadsheets within an instance as an array, builds it if it doesn't exist
                 * @param [forceRebuild]
                 * @returns {Array|spreadsheets}
                 * @memberOf jS
                 */
                spreadsheetsToArray:function (forceRebuild) {
                    if (forceRebuild || jS.spreadsheets.length == 0) {
                        jS.cycleCellsAll(function (sheet, row, col) {
                            jS.createCell(sheet, row, col);
                        });
                    }
                    return jS.spreadsheets;
                },

                /**
                 * Returns singe spreadsheet from a set of spreadsheets within as instance, builds if it doesn't exist
                 * @param {Boolean} forceRebuild Enforces the spreadsheet to be rebuilt
                 * @param {Number} i Spreadsheet index
                 * @memberOf jS
                 */
                spreadsheetToArray:function (forceRebuild, i) {
                    i = (i ? i : jS.i);
                    if (!jS.spreadsheets[i]) {
                        jS.cycleCells(function (sheet, row, col) {
                            jS.createCell(sheet, row, col);
                        });
                    }
                    return jS.spreadsheets[i];
                },

                /**
                 * Creates a single cell within
                 * @param {Number} sheetIndex
                 * @param {Number} rowIndex
                 * @param {Number} colIndex
                 * @param {Number} [calcCount]
                 * @param {Date} [calcLast]
                 * @param {Date} [calcDependenciesLast]
                 * @returns {jSCell}
                 * @memberOf jS
                 */
                createCell:function (sheetIndex, rowIndex, colIndex, calcCount, calcLast, calcDependenciesLast) {
                    //first create cell
                    var sheet,
                        row,
                        jSCell,
                        jSCells,
                        table,
                        colGroup,
                        col,
                        tBody,
                        tr,
                        td,
                        $td,
                        tdsX,
                        tdsY;

                    if (!(sheet = jS.spreadsheets[sheetIndex])) { //check if spreadsheet exists, if not, create it as an array
                        sheet = jS.spreadsheets[sheetIndex] = [];
                    }

                    if (!(row = sheet[rowIndex])) { //check if row exists, if not, create it
                        row = sheet[rowIndex] = [];
                    }

                    if (!(table = jS.controls.tables[sheetIndex])) {
                        return {};
                    }
                    if (!(tBody = table.tBody)) {
                        return {};
                    }
                    if (!(tr = tBody.children[rowIndex])) {
                        return {};
                    }
                    if (!(td = tr.children[colIndex])) {
                        return {};
                    }

                    $td = $(td);

                    jSCell = row[colIndex] = td.jSCell = { //create cell
                        td:$td,
                        dependencies: [],
                        formula:td.getAttribute('data-formula') || '',
                        cellType:td.getAttribute('data-celltype') || null,
                        value:td.textContent || td.innerText || '',
                        calcCount:calcCount || 0,
                        calcLast:calcLast || -1,
                        calcDependenciesLast:calcDependenciesLast || -1,
                        sheet:sheetIndex,
                        type: 'cell',
                        jS: jS,
                        state: [],
                        needsUpdated: true,
                        uneditable: td.getAttribute('data-uneditable') || false
                    };

                    if (jSCell.formula && jSCell.formula.charAt(0) == '=') {
                        jSCell.formula = jSCell.formula.substring(1);
                    }


                    //attach cells to col
                    colGroup = table.colGroup;
                    while (!(col = colGroup.children[colIndex])) {
                        //if a col doesn't exist, it adds it here
                        col = document.createElement('col');
                        col.setAttribute('style', 'width:' + jS.s.newColumnWidth + 'px;');
                        colGroup.appendChild(col);
                    }

                    if (!(jSCells = col.jSCells)) jSCells = col.jSCells = [];
                    jSCells.unshift(jSCell);

                    //attach td to col
                    if (!col.tds) col.tds = [];
                    col.tds.unshift(td);

                    //attach col to td
                    td.col = col;
                    td.type = 'cell';
                    td.barLeft = tr.children[0];
                    td.barTop = tBody.children[0].children[colIndex];

                    //attach cells to tr
                    if (!tr.jSCells) tr.jSCells = [];
                    tr.jSCells.unshift(jSCell);

                    //attach td's to tr
                    if (!tr.tds) tr.tds = [];
                    tr.tds.unshift(td);

                    //attach cells to table
                    if (!table.jSCells) table.jSCells = [];
                    table.jSCells.unshift(jSCell);

                    //attach td's to table
                    if (!table.tds) table.tds = [];
                    table.tds.unshift(td);

                    //attach table to td
                    td.table = table;

                    //now create row
                    if (!(tdsY = jS.controls.bar.y.td[sheetIndex])) {
                        tdsY = jS.controls.bar.y.td[sheetIndex] = [];
                    }
                    if (!tdsY[rowIndex]) {
                        tdsY[rowIndex] = $(tr.children[0]);
                    }

                    if (!(tdsX = jS.controls.bar.x.td[sheetIndex])) {
                        tdsX = jS.controls.bar.x.td[sheetIndex] = [];
                    }
                    if (!tdsX[colIndex]) {
                        tdsX[colIndex] = $(tBody.children[0].children[colIndex]);
                    }

                    //return cell
                    return jSCell;
                },

                /**
                 * Get cell value
                 * @memberOf jS
                 * @param {Number} rowIndex
                 * @param {Number} colIndex
                 * @param {Number} [sheetIndex] defaults to 0
                 * @returns {Object|Null}
                 */
                getCell: function (rowIndex, colIndex, sheetIndex) {
                    var spreadsheet, row, cell;
                    sheetIndex = (sheetIndex || 0);
                    if (
                        jS.spreadsheets
                            && (spreadsheet = jS.spreadsheets[sheetIndex])
                            && (row = spreadsheet[rowIndex])
                            && (cell = row[colIndex])
                        ) {
                        return cell;
                    }
                    return null;
                },

                /**
                 * Tracks which spreadsheet is active to intercept keystrokes for navigation
                 * @type {Boolean}
                 * @memberOf jS
                 */
                nav:false,

                /**
                 * Turns off all intercept keystroke navigation instances, with exception of supplied instance index
                 * @param {Boolean} nav Instance index
                 * @memberOf jS
                 */
                setNav:function (nav) {
                    var instance = $.sheet.instance;
                    for(var i = 0; i < instance.length; i++) {
                        (instance[i] || {}).nav = false;
                    }

                    jS.nav = nav;
                },

                /**
                 * Creates the different objects required by sheets
                 * @memberOf jS
                 * @type {Object}
                 * @namespace
                 */
                controlFactory:{
                    /**
                     * Creates multi rows
                     * @param {Number} [i] row index
                     * @param {Number} [qty] the number of cells you'd like to add, if not specified, a dialog will ask
                     * @param {Boolean} [isBefore] places cells before the selected cell if set to true, otherwise they will go after, or at end
                     * @param {Boolean} [skipFormulaReParse] re-parses formulas if needed
                     * @memberOf jS.controlFactory
                     */
                    addRowMulti:function (i, qty, isBefore, skipFormulaReParse) {
                        function add(qty) {
                            if (qty) {
                                if (!n(qty)) {
                                    jS.controlFactory.addCells(i, isBefore, parseInt(qty), 'row', skipFormulaReParse);
                                    jS.trigger('sheetAddRow', [i, isBefore, qty]);
                                }
                            }
                        }

                        if (!qty) {
                            s.prompt(
                                jS.msg.addRowMulti,
                                add
                            );
                        } else {
                            add(qty);
                        }
                    },

                    /**
                     * Creates multi columns
                     * @param {Number} [i] column index
                     * @param {Number} [qty] the number of cells you'd like to add, if not specified, a dialog will ask
                     * @param {Boolean} [isBefore] places cells before the selected cell if set to true, otherwise they will go after, or at end
                     * @param {Boolean} [skipFormulaReParse] re-parses formulas if needed
                     * @memberOf jS.controlFactory
                     */
                    addColumnMulti:function (i, qty, isBefore, skipFormulaReParse) {
                        function add(qty) {
                            if (qty) {
                                if (!n(qty)) {
                                    jS.controlFactory.addCells(i, isBefore, parseInt(qty), 'col', skipFormulaReParse);
                                    jS.trigger('sheetAddColumn', [i, isBefore, qty]);
                                }
                            }
                        }

                        if (!qty) {
                            s.prompt(
                                jS.msg.addColumnMulti,
                                add
                            );
                        } else {
                            add(qty);
                        }
                    },

                    /**
                     * Creates cells for sheet and the bars that go along with them
                     * @param {Number} [i] index where cells should be added, if null, cells go to end
                     * @param {Boolean} [isBefore] places cells before the selected cell if set to true, otherwise they will go after, or at end;
                     * @param {Number} [qty] how many rows/columns to add
                     * @param {String} [type] "row" or "col", default "col"
                     * @param {Boolean} [skipFormulaReParse] re-parses formulas if needed
                     * @memberOf jS.controlFactory
                     */
                    addCells:function (i, isBefore, qty, type, skipFormulaReParse) {
                        //hide the autoFiller, it can get confused
                        jS.autoFillerHide();

                        jS.setDirty(true);
                        jS.setChanged(true);
                        jS.obj.barHelper().remove();

                        var $sheet = jS.obj.table(),
                            sheet = $sheet[0],
                            sheetSize = jS.sheetSize(sheet),
                            isLast = false,
                            activeCell = jS.obj.tdActive(),
                            o;

                        qty = qty || 1;
                        type = type || 'col';

                        if (i == u) {
                            i = (type == 'row' ? sheetSize.rows : sheetSize.cols);
                            isLast = true;
                        }

                        switch (type) {
                            case "row":
                                if ($.sheet.max) {
                                    //if current size is less than max, but the qty needed is more than the max
                                    if ($.sheet.max > sheetSize.rows && $.sheet.max <= sheetSize.rows + qty) {
                                        qty = $.sheet.max - sheetSize.rows;

                                        //if current size is more than max
                                    } else if ($.sheet.max && $.sheet.max <= sheetSize.rows + qty) {
                                        if (!jS.isBusy()) {
                                            s.alert(jS.msg.maxRowsBrowserLimitation);
                                        }
                                        return false;
                                    }
                                }
                                o = {
                                    el:function () {
                                        //table / tBody / tr / td
                                        var tds = jS.rowTds(sheet, i);
                                        if (!tds || !tds[0]) return [];
                                        return [tds[0].parentNode];
                                    },
                                    size:function () {
                                        if (!o.Size) {
                                            var tr = o.el()[0];
                                            o.Size = tr.children.length - 1;
                                        }
                                        return o.Size;
                                    },
                                    loc:function () {
                                        var tr = o.el();
                                        return jS.getTdLocation(tr[0].children);
                                    },
                                    trs: [],
                                    newObj:function () {
                                        var j = o.size(),
                                            tr = document.createElement('tr');

                                        tr.setAttribute('style', 'height: ' + s.colMargin + 'px;');
                                        for (var i = 0; i <= j; i++) {
                                            var td = document.createElement('td');
                                            if (i == 0) {
                                                td.setAttribute('class', jS.cl.barLeft + ' ' + jS.cl.uiBar);
                                                td.entity = 'left';
                                                td.type = 'bar';
                                            }
                                            tr.appendChild(td);
                                        }

                                        o.trs.push(tr);

                                        return tr;
                                    },
                                    offset:{row:qty, col:0},
                                    start:function () {
                                        return {row:(isBefore ? i : i + qty)};
                                    },
                                    createCells:function () {
                                        for (var row = 0; row < o.trs.length; row++) {
                                            var offset = (isBefore ? 0 : 1) + i;
                                            jS.spreadsheets[jS.i].splice(row + offset, 0, []);
                                            for (var col = 0; col < o.trs[row].children.length; col++) {
                                                if (col == 0) {//skip bar
                                                    jS.controls.bar.y.td[jS.i].splice(row + offset, 0, $(o.trs[row].children[col]));
                                                } else {
                                                    jS.createCell(jS.i, row + offset, col);
                                                }
                                            }
                                        }

                                        jS.refreshRowLabels(i);
                                    }
                                };
                                break;
                            case "col":
                                if ($.sheet.max) {
                                    //if current size is less than max, but the qty needed is more than the max
                                    if ($.sheet.max > sheetSize.cols && $.sheet.max <= sheetSize.cols + qty) {
                                        qty = $.sheet.max - sheetSize.cols;

                                        //if current size is more than max
                                    } else if ($.sheet.max && $.sheet.max <= sheetSize.cols + qty) {
                                        if (!jS.isBusy()) {
                                            s.alert(jS.msg.maxColsBrowserLimitation);
                                        }
                                        return false;
                                    }
                                }
                                o = {
                                    el:function () {
                                        var tdStart = jS.rowTds(sheet, 1)[i],
                                            lastRow = jS.rowTds(sheet),
                                            tdEnd = lastRow[lastRow.length - 1],
                                            loc2 = jS.getTdLocation(tdEnd),

                                            tds = [];

                                        for (var j = 0; j <= loc2.row; j++) {
                                            tds.push(sheet.tBody.children[j].children[i]);
                                        }

                                        return tds;
                                    },
                                    col:function () {
                                        return jS.col(sheet, i);
                                    },
                                    cols: [],
                                    newCol:function () {
                                        var col = document.createElement('col');
                                        col.setAttribute('style', 'width:' + jS.s.newColumnWidth + 'px;');
                                        o.cols.push(col);
                                        return col;
                                    },
                                    loc:function (tds) {
                                        tds = (tds ? tds : o.el());
                                        return jS.getTdLocation(tds[0]);
                                    },
                                    tds: [],
                                    newObj:function () {
                                        var td = document.createElement('td');
                                        o.tds.push(td);
                                        return td;
                                    },
                                    offset:{row:0, col:qty},
                                    start:function () {
                                        return {col:(isBefore ? i : i + qty)};
                                    },
                                    createCells:function () {
                                        var rows = jS.rows(sheet);
                                        for (var row = 0; row < rows.length; row++) {
                                            var col = (isBefore ? 0 : 1) + i,
                                                colMax = col + qty,
                                                j = 0;
                                            for (col; col < colMax; col++) {
                                                var td = sheet.tBody.children[row].children[col],
                                                    $td = $(td);
                                                if (row == 0) {
                                                    jS.controls.bar.x.td[jS.i].splice(col, 0, $td);
                                                    td.innerText = jSE.columnLabelString(col);
                                                    td.className = jS.cl.barTop + ' ' + jS.cl.uiBar;
                                                    td.type = 'bar';
                                                    td.entity = 'top';

                                                    o.cols[j].setAttribute('style', 'width:' + jS.s.newColumnWidth + 'px;');
                                                    o.cols[j].bar = td;
                                                    j++;
                                                } else {
                                                    jS.spreadsheets[jS.i][row].splice(col, 0, {});
                                                    jS.createCell(jS.i, row, col);
                                                }
                                            }
                                        }

                                        jS.refreshColumnLabels(i);
                                    }
                                };
                                break;
                        }

                        var el = o.el(),
                            loc = o.loc(el),
                            col,
                            j = el.length - 1,
                            k;

                        if (isBefore) {
                            do {
                                k = qty - 1;
                                do {
                                    el[j].parentNode.insertBefore(o.newObj(), el[j]);
                                } while (k--);
                            } while (j--);

                            if (o.newCol) {
                                col = o.col();
                                k = qty - 1;
                                do {
                                    col.parentNode.insertBefore(o.newCol(), col);
                                } while (k--);
                            }
                        } else {
                            do {
                                k = qty - 1;
                                do {
                                    insertAfter(o.newObj(), el[j]);
                                } while (k--);
                            } while (j--);

                            if (o.newCol) {
                                col = o.col();
                                k = qty - 1;
                                do {
                                    insertAfter(o.newCol(), col)
                                } while (k--);
                            }
                        }

                        o.createCells();

                        if (!skipFormulaReParse && isLast != true) {
                            //offset formulas
                            jS.offsetFormulas(loc, o.offset, isBefore);
                        }

                        jS.obj.pane().resizeScroll(true);

                        if (activeCell && activeCell[0] && activeCell[0].cellIndex && activeCell[0].parentNode) {
                            jS.colLast = activeCell[0].cellIndex;
                            jS.rowLast = activeCell[0].parentNode.rowIndex;
                        }

                        return true;
                    },

                    /**
                     * creates single row
                     * @param {Number} [i] row index
                     * @param {Boolean} [isBefore] places cells before the selected cell if set to true, otherwise they will go after, or at end
                     * @memberOf jS.controlFactory
                     */
                    addRow:function (i, isBefore) {
                        jS.controlFactory.addCells(i, isBefore, 1, 'row');
                        jS.trigger('sheetAddRow', [i, isBefore, 1]);
                    },

                    /**
                     * creates single column
                     * @param {Number} [i], column index
                     * @param {Boolean} [isBefore] places cells before the selected cell if set to true, otherwise they will go after, or at end
                     * @memberOf jS.controlFactory
                     */
                    addColumn:function (i, isBefore) {
                        jS.controlFactory.addCells(i, isBefore, 1, 'col');
                        jS.trigger('sheetAddColumn', [i, isBefore, 1]);
                    },

                    /**
                     * Creates all the bars to the left of the spreadsheet, if they exist, they are first removed
                     * @param {jQuery|HTMLElement} table Table of spreadsheet
                     * @memberOf jS.controlFactory
                     */
                    barLeft:function (table) {
                        var tr = table.tBody.children,
                            i = tr.length - 1;

                        //table / tBody / tr
                        if (i > -1) {
                            do {
                                tr[i].insertBefore(document.createElement('td'), tr[i].children[0]);
                            } while(i-- > 1); //We only go till row 1, row 0 is handled by barTop with corner etc
                        }
                    },

                    /**
                     * Creates all the bars to the top of the spreadsheet on colGroup col elements, if they exist, they are first removed
                     * @param {HTMLElement} table representing spreadsheet
                     * @memberOf jS.controlFactory
                     */
                    barTop:function (table) {
                        var colGroup = table.colGroup,
                            cols = colGroup.children,
                            i,
                            trFirst = table.tBody.children[0],

                            colCorner = document.createElement('col'), //left column & corner
                            tdCorner = document.createElement('td'),

                            barTopParent = document.createElement('tr');

                        //If the col elements outnumber the td's, get rid of the extra as it messes with the ui
                        while (cols.length > trFirst.children.length) {
                            colGroup.removeChild(cols[cols.length -1]);
                        }

                        colCorner.width = s.colMargin + 'px';
                        colCorner.style.width = colCorner.width;
                        colGroup.insertBefore(colCorner, colGroup.children[0]); //end col corner

                        barTopParent.appendChild(tdCorner);

                        barTopParent.className = jS.cl.barTopParent;
                        table.tBody.insertBefore(barTopParent, table.tBody.children[0]);
                        table.barTopParent = barTopParent;
                        table.corner = tdCorner;
                        jS.controls.barTopParent[jS.i] = $(barTopParent);

                        i = trFirst.children.length - 1;

                        do {
                            var td = document.createElement('td');
                            if (!cols[i]) {
                                cols[i] = document.createElement('col');
                                colGroup.insertBefore(cols[i], colCorner.nextSibling);

                            }

                            cols[i].bar = td;
                            td.col = cols[i];
                            barTopParent.insertBefore(td, tdCorner.nextSibling);
                        } while (i-- > 0);

                        table.barTop = jS.controls.barTopParent[jS.i].children();

                        return barTopParent;
                    },

                    /**
                     * Creates the draggable objects for freezing cells
                     * @type {Object}
                     * @memberOf jS.controlFactory
                     * @namespace
                     */
                    barHandleFreeze:{

                        /**
                         * @param {jQuery|HTMLElement} pane
                         * @returns {Boolean}
                         * @memberOf jS.controlFactory.barHandleFreeze
                         */
                        top:function (pane) {
                            if (jS.isBusy()) {
                                return false;
                            }
                            var
                                actionUI = jS.obj.pane().actionUI,
                                frozenAt = actionUI.frozenAt,
                                scrolledArea = actionUI.scrolledArea;

                            if (!(scrolledArea.end.col <= frozenAt.col + 1)) {
                                return false;
                            }

                            jS.obj.barHelper().remove();

                            var bar = jS.obj.barTop(frozenAt.col + 1),
                                pos = bar.position(),
                                highlighter,
                                offset = $(pane).offset(),
                                handle = document.createElement('div'),
                                $handle = pane.freezeHandleTop = $(handle)
                                    .appendTo(pane)
                                    .addClass(jS.cl.uiBarHandleFreezeTop + ' ' + jS.cl.barHelper + ' ' + jS.cl.barHandleFreezeTop)
                                    .height(bar.height())
                                    .css('left', (pos.left - handle.clientWidth) + 'px')
                                    .attr('title', jS.msg.dragToFreezeCol),
                                tds = pane.table.barTop;


                            jS.controls.bar.helper[jS.i] = jS.obj.barHelper().add(handle);
                            jS.controls.bar.x.handleFreeze[jS.i] = $handle;

                            jS.draggable($handle, {
                                axis:'x',
                                start:function () {
                                    jS.setBusy(true);

                                    highlighter = $(document.createElement('div'))
                                        .appendTo(pane)
                                        .css('position', 'absolute')
                                        .addClass('ui-state-highlight ' + jS.cl.barHelper)
                                        .height(pane.table.corner.clientHeight)
                                        .fadeTo(0,0.33);
                                },
                                drag:function() {
                                    var target = jS.nearest($handle, tds).prev();
                                    if (target.length && target.position) {
                                        highlighter.width(target.position().left + target.width());
                                    }
                                },
                                stop:function (e, ui) {
                                    highlighter.remove();
                                    jS.setBusy(false);
                                    jS.setDirty(true);
                                    var target = jS.nearest($handle, tds);

                                    jS.obj.barHelper().remove();
                                    scrolledArea.end.col = actionUI.frozenAt.col = jS.getTdLocation(target).col - 1;
                                    jS.autoFillerHide();
                                    actionUI.scrollStart('x', jS.sheetSize(pane.table));
                                },
                                containment:[offset.left, offset.top, math.min(offset.left + pane.table.clientWidth, offset.left + pane.clientWidth - window.scrollBarSize.width), offset.top]
                            });

                            return true;
                        },

                        /**
                         *
                         * @param {jQuery|HTMLElement} pane
                         * @returns {Boolean}
                         * @memberOf jS.controlFactory.barHandleFreeze
                         */
                        left:function (pane) {
                            if (jS.isBusy()) {
                                return false;
                            }
                            var pane = jS.obj.pane(),
                                actionUI = pane.actionUI,
                                frozenAt = actionUI.frozenAt,
                                scrolledArea = actionUI.scrolledArea;

                            if (!(scrolledArea.end.row <= (frozenAt.row + 1))) {
                                return false;
                            }

                            jS.obj.barHelper().remove();

                            var bar = $(pane.table.tBody.children[frozenAt.row + 1].children[0]),
                                pos = bar.position(),
                                highlighter,
                                offset = $(pane).offset(),
                                handle = document.createElement('div'),
                                $handle = pane.freezeHandleLeft = $(handle)
                                    .appendTo(pane)
                                    .addClass(jS.cl.uiBarHandleFreezeLeft + ' ' + jS.cl.barHelper + ' ' + jS.cl.barHandleFreezeLeft)
                                    .width(bar.width())
                                    .css('top', (pos.top - handle.clientHeight) + 'px')
                                    .attr('title', jS.msg.dragToFreezeRow),
                                trs = $(pane.table.tBody.children);

                            jS.controls.bar.helper[jS.i] = jS.obj.barHelper().add(handle);
                            jS.controls.bar.y.handleFreeze[jS.i] = $handle;

                            jS.draggable($handle, {
                                axis:'y',
                                start:function () {
                                    jS.setBusy(true);

                                    highlighter = $(document.createElement('div'))
                                        .appendTo(pane)
                                        .css('position', 'absolute')
                                        .addClass('ui-state-highlight ' + jS.cl.barHelper)
                                        .width(handle.clientWidth)
                                        .fadeTo(0,0.33);
                                },
                                drag:function() {
                                    var target = jS.nearest($handle, trs).prev();
                                    if (target.length && target.position) {
                                        highlighter.height(target.position().top + target.height());
                                    }
                                },
                                stop:function (e, ui) {
                                    highlighter.remove();
                                    jS.setBusy(false);
                                    jS.setDirty(true);
                                    var target = jS.nearest($handle, trs);
                                    jS.obj.barHelper().remove();
                                    scrolledArea.end.row = actionUI.frozenAt.row = math.max(jS.getTdLocation(target.children(0)).row - 1, 0);
                                    jS.autoFillerHide();
                                    pane.actionUI.scrollStart('y', jS.sheetSize(pane.table));
                                },
                                containment:[offset.left, offset.top, offset.left, math.min(offset.top + pane.table.clientHeight, offset.top + pane.clientHeight - window.scrollBarSize.height)]
                            });

                            return true;
                        },

                        /**
                         * @memberOf jS.controlFactory.barHandleFreeze
                         */
                        corner:function () {
                        }
                    },

                    /**
                     *
                     * Creates menus for contextual menus and top bar button
                     * @param bar
                     * @param menuItems
                     * @returns {jQuery|HTMLElement}
                     * @memberOf jS.controlFactory
                     */
                    menu:function (bar, menuItems) {
                        var menu, buttons = $([]);

                        switch (bar) {
                            case "top":
                                menu = $(document.createElement('div'))
                                    .addClass(jS.cl.uiMenu + ' ' + jS.cl.tdMenu);
                                jS.controls.bar.x.menu[jS.i] = menu;
                                break;
                            case "left":
                                menu = $(document.createElement('div'))
                                    .addClass(jS.cl.uiMenu + ' ' + jS.cl.tdMenu);
                                jS.controls.bar.y.menu[jS.i] = menu;
                                break;
                            case "cell":
                                menu = $(document.createElement('div'))
                                    .addClass(jS.cl.uiMenu + ' ' + jS.cl.tdMenu);
                                jS.controls.tdMenu[jS.i] = menu;
                                break;
                        }

                        jS.controls.menus[jS.i] = jS.obj.menus().add(menu);

                        menu
                            .mouseleave(function () {
                                menu.hide();
                            })
                            .bind('contextmenu', function() {return false;})
                            .appendTo($body)
                            .hide()
                            .disableSelectionSpecial();

                        for (var msg in menuItems) {
                            if (menuItems[msg]) {
                                if ($.isFunction(menuItems[msg])) {
                                    buttons.pushStack(
                                        $(document.createElement('div'))
                                            .text(msg)
                                            .data('msg', msg)
                                            .click(function () {
                                                menuItems[$(this).data('msg')].call(this, jS);
                                                menu.hide();
                                                return false;
                                            })
                                            .appendTo(menu)
                                            .hover(function() {
                                                buttons.removeClass('ui-state-highlight');
                                                $(this).addClass('ui-state-highlight');
                                            }, function() {
                                                $(this).removeClass('ui-state-highlight');
                                            })
                                    );

                                } else if (menuItems[msg] == 'line') {
                                    $(document.createElement('hr')).appendTo(menu);
                                }
                            }
                        }

                        return menu;
                    },

                    /**
                     * Creates items within menus using jQuery.sheet.instance.msg
                     * @memberOf jS.controlFactory
                     * @namespace
                     */
                    barMenu:{

                        /**
                         * @param {Object} e jQuery event
                         * @param {Number} i column
                         * @param {jQuery|HTMLElement} target
                         * @returns {*}
                         * @memberOf jS.controlFactory.barMenu
                         */
                        top:function (e, i, target) {
                            if (jS.isBusy()) {
                                return false;
                            }
                            var menu = jS.obj.barMenuTop().hide();

                            if (!menu.length) {
                                menu = jS.controlFactory.menu('top', s.contextmenuTop);
                            }

                            jS.obj.menus().hide();

                            if (!target) {
                                menu
                                    .css('left', (e.pageX - 5) + 'px')
                                    .css('top', (e.pageY - 5) + 'px')
                                    .show();
                                return menu;
                            }

                            var barMenuParentTop = jS.obj.barMenuParentTop().hide();

                            if (!barMenuParentTop.length) {

                                barMenuParentTop = $(document.createElement('div'))
                                    .addClass(jS.cl.uiBarMenuTop + ' ' + jS.cl.barHelper + ' ' + jS.cl.barTopMenuButton)
                                    .append(
                                        $(document.createElement('span'))
                                            .addClass('ui-icon ui-icon-triangle-1-s')
                                    )
                                    .mousedown(function (e) {
                                        barMenuParentTop.parent()
                                            .mousedown()
                                            .mouseup();

                                        var offset = barMenuParentTop.offset();

                                        menu
                                            .css('left', (e.pageX - 5) + 'px')
                                            .css('top', (e.pageY - 5) + 'px')
                                            .show();
                                    })
                                    .blur(function () {
                                        if (menu) menu.hide();
                                    })
                                    .bind('destroy', function () {
                                        barMenuParentTop.remove();
                                        jS.controls.bar.x.menuParent[jS.i] = null;
                                    });

                                jS.controls.bar.x.menuParent[jS.i] = barMenuParentTop;
                            }

                            barMenuParentTop
                                .prependTo(target)
                                .show();
                        },

                        /**
                         *
                         * @param e
                         * @param i
                         * @returns {Boolean}
                         * @memberOf jS.controlFactory.barMenu
                         */
                        left:function (e, i) {
                            if (jS.isBusy()) {
                                return false;
                            }
                            jS.obj.barMenuLeft().hide();

                            if (i) {
                                jS.obj.barHandleFreezeLeft().remove();
                            }
                            var menu;

                            menu = jS.obj.barMenuLeft();

                            if (!menu.length) {
                                menu = jS.controlFactory.menu('left', s.contextmenuLeft);
                            }

                            jS.obj.menus().hide();

                            menu
                                .css('left', (e.pageX - 5) + 'px')
                                .css('top', (e.pageY - 5) + 'px')
                                .show();

                            return true;
                        },

                        /**
                         * @memberOf jS.controlFactory.barMenu
                         */
                        corner:function () {
                        }
                    },


                    /**
                     * Creates contextual menus for cells (a right click menu)
                     * @param {Object} e jQuery event
                     * @returns {Boolean}
                     * @memberOf jS.controlFactory
                     */
                    tdMenu:function (e) {
                        if (jS.isBusy()) {
                            return false;
                        }
                        jS.obj.tdMenu().hide();

                        var menu = jS.obj.tdMenu();

                        if (!menu.length) {
                            menu = jS.controlFactory.menu('cell', s.contextmenuCell);
                        }

                        jS.obj.menus().hide();

                        menu
                            .css('left', (e.pageX - 5) + 'px')
                            .css('top', (e.pageY - 5) + 'px')
                            .show();

                        return true;
                    },


                    /**
                     * Creates the control/container for everything above the spreadsheet, removes them if they already exist
                     * @memberOf jS.controlFactory
                     */
                    header:function () {
                        jS.obj.header().remove();
                        jS.obj.sheetAdder().remove();
                        jS.obj.tabContainer().remove();

                        var header = document.createElement('div'),
                            firstRow = document.createElement('table'),
                            firstRowTr = document.createElement('tr'),
                            secondRow,
                            secondRowTr,
                            title = document.createElement('td'),
                            label,
                            menuLeft,
                            menuRight,
                            formula,
                            formulaParent;

                        header.appendChild(firstRow);
                        firstRow.appendChild(firstRowTr);
                        header.className = jS.cl.header + ' ' + jS.cl.uiControl;

                        jS.controls.header = $(header);

                        if (s.title) {
                            if ($.isFunction(s.title)) {
                                s.title = jS.title(jS, I);
                            }

                            title.className = jS.cl.title;
                            jS.controls.title = $(title).html(s.title)
                        } else {
                            $(title).hide();
                        }
                        firstRowTr.appendChild(title);

                        //Sheet Menu Control
                        function makeMenu(menu) {
                            if ($.isFunction(menu)) {
                                menu = $(menu.call(jS));
                            } else {
                                menu = $(menu);
                            }

                            if (menu.is('ul')) {
                                menu
                                    .find("ul").hide()
                                    .addClass(jS.cl.uiMenuUl);

                                menu
                                    .find("li")
                                    .addClass(jS.cl.uiMenuLi)
                                    .hover(function () {
                                        $(this).find('ul:first')
                                            .hide()
                                            .show();
                                    }, function () {
                                        $(this).find('ul:first')
                                            .hide();
                                    });
                            }
                            return menu;
                        }

                        if (jS.isSheetEditable()) {
                            if (s.menuLeft) {
                                menuLeft = document.createElement('td');
                                menuLeft.className = jS.cl.menu + ' ' + jS.cl.menuFixed;
                                firstRowTr.insertBefore(menuLeft, title);

                                jS.controls.menuLeft[jS.i] = $(menuLeft)
                                    .append(makeMenu(s.menuLeft));

                                jS.controls.menuLeft[jS.i].find('img').load(function () {
                                    jS.sheetSyncSize();
                                });
                            }

                            if (s.menuRight) {
                                menuRight = document.createElement('td');
                                menuRight.className = jS.cl.menu + ' ' + jS.cl.menuFixed;
                                firstRowTr.appendChild(menuRight);

                                jS.controls.menuRight[jS.i] = $(menuRight)
                                    .append(makeMenu(s.menuRight));

                                jS.controls.menuRight[jS.i].find('img').load(function () {
                                    jS.sheetSyncSize();
                                });
                            }

                            label = document.createElement('td');
                            label.className = jS.cl.label;
                            jS.controls.label = $(label);

                            //Edit box menu
                            formula = document.createElement('textarea');
                            formula.className = jS.cl.formula;
                            formula.onkeydown = jS.evt.formula.keydown;
                            formula.onkeyup = function () {
                                jS.obj.inPlaceEdit().value = this.value;
                            };
                            formula.onchange = function () {
                                jS.obj.inPlaceEdit().value = this.value;
                            };
                            formula.onpaste = jS.evt.pasteOverCells;
                            formula.onfocus = function () {
                                jS.setNav(false);
                            };
                            formula.onfocusout = function () {
                                jS.setNav(true);
                            };
                            formula.onblur = function () {
                                jS.setNav(true);
                            };
                            jS.controls.formula = $(formula);

                            // resizable formula area - a bit hard to grab the handle but is there!
                            var formulaResize = document.createElement('span');
                            formulaResize.appendChild(formula);

                            secondRow = document.createElement('table');
                            secondRowTr = document.createElement('tr');
                            secondRow.appendChild(secondRowTr);

                            header.appendChild(secondRow);


                            formulaParent = document.createElement('td');
                            formulaParent.className = jS.cl.formulaParent;
                            formulaParent.appendChild(formulaResize);
                            secondRowTr.appendChild(label);
                            secondRowTr.appendChild(formulaParent);

                            jS.resizableSheet($(formulaResize), {
                                minHeight:jS.controls.formula.height(),
                                maxHeight:78,
                                handles:'s',
                                resize:function (e, ui) {
                                    jS.controls.formula.height(ui.size.height);
                                },
                                stop: function() {
                                    jS.sheetSyncSize();
                                }
                            });

                            var instance = $.sheet.instance;
                            for(var i = 0; i < instance.length; i++) {
                                (instance || {}).nav = false;
                            }

                            jS.setNav(true);

                            $(document).keydown(jS.evt.document.keydown);
                        }

                        return header;
                    },

                    /**
                     * Creates the user interface for spreadsheets
                     * @memberOf jS.controlFactory
                     */
                    ui:function () {
                        var ui = document.createElement('div');
                        ui.setAttribute('class', jS.cl.ui);
                        jS.obj.ui = ui;
                        return ui;
                    },

                    sheetAdder: function () {
                        var addSheet = document.createElement('span');
                        if (jS.isSheetEditable()) {
                            addSheet.setAttribute('class', jS.cl.sheetAdder + ' ' + jS.cl.tab + ' ' + jS.cl.uiTab + ' ui-corner-bottom');
                            addSheet.setAttribute('title', jS.msg.addSheet);
                            addSheet.innerHTML = '&nbsp;+&nbsp;';
                            addSheet.onmousedown = function () {
                                jS.addSheet();

                                return false;
                            };
                            addSheet.i = -1;
                        }
                        return jS.controls.sheetAdder = $(addSheet);
                    },

                    /**
                     * Creates the tab interface for spreadsheets
                     * @memberOf jS.controlFactory
                     */
                    tabContainer:function () {
                        var tabContainer = document.createElement('span'),
                            startPosition;
                        tabContainer.setAttribute('class', jS.cl.tabContainer);

                        tabContainer.onmousedown = function (e) {
                            e = e || window.event;

                            var i = (e.target || e.srcElement).i;
                            if (i >= 0) {
                                jS.trigger('sheetSwitch', [i]);
                            }
                            return false;
                        };
                        tabContainer.ondblclick = function (e) {
                            e = e || window.event;
                            var i = (e.target || e.srcElement).i;
                            if (i >= 0) {
                                jS.trigger('sheetRename', [i]);
                            }
                            return false;
                        };


                        if (jS.isSheetEditable() && $.fn.sortable) {
                            return jS.controls.tabContainer = $(tabContainer).sortable({
                                placeholder:'ui-state-highlight',
                                axis:'x',
                                forceHelperSize:true,
                                forcePlaceholderSize:true,
                                opacity:0.6,
                                start:function (e, ui) {
                                    startPosition = ui.item.index();
                                    jS.trigger('sheetTabSortStart', [e, ui]);
                                },
                                update:function (e, ui) {
                                    jS.trigger('sheetTabSortUpdate', [e, ui, startPosition]);
                                }
                            });
                        }

                        return jS.controls.tabContainer = $(tabContainer);
                    },

                    /**
                     * Creates the spreadsheet user interface
                     * @param {HTMLElement} ui raw user interface
                     * @param {HTMLElement} table raw table
                     * @param {Number} i the new count for spreadsheets in this instance
                     * @memberOf jS.controlFactory
                     */
                    sheetUI:function (ui, table, i) {
                        jS.i = i;

                        jS.tuneTableForSheetUse(table);

                        jS.readOnly[i] = (table.className || '').match(/\breadonly\b/i) != null;

                        var enclosure = jS.controlFactory.enclosure(table),
                            pane = enclosure.pane,
                            $pane = $(pane),
                            paneContextmenuEvent = function (e) {
                                e = e || window.event;
                                if (jS.isBusy()) {
                                    return false;
                                }
                                if (jS.isBar(e.target)) {
                                    var entity = e.target.entity,
                                        i = jS.getBarIndex[entity](e.target);

                                    if (i < 0) return false;

                                    if (jS.evt.barInteraction.first == jS.evt.barInteraction.last) {
                                        jS.controlFactory.barMenu[entity](e, i);
                                    }
                                } else {
                                    jS.controlFactory.tdMenu(e);
                                }
                                return false;
                            };

                        ui.appendChild(enclosure);

                        jS.controlFactory.barTop(table);
                        jS.controlFactory.barLeft(table);

                        pane.appendChild(table);

                        if (jS.isSheetEditable()) {
                            jS.controlFactory.autoFiller(pane);
                        }

                        if (jS.isSheetEditable()) {
                            var formula = jS.obj.formula(),
                                mouseDownEntity = "";

                            $pane.mousedown(function (e) {
                                jS.setNav(true);
                                if (jS.isBusy()) {
                                    return false;
                                }

                                if (jS.isCell(e.target)) {
                                    if (e.button == 2) {
                                        paneContextmenuEvent.call(this, e);
                                        jS.evt.cellOnMouseDown(e);
                                        return true;
                                    }
                                    jS.evt.cellOnMouseDown(e);
                                    return false;
                                }

                                if (jS.isBar(e.target)) { //possibly a bar
                                    if (e.button == 2) {
                                        paneContextmenuEvent.call(this, e);
                                    }
                                    mouseDownEntity = e.target.entity;
                                    jS.evt.barInteraction.select(e.target);
                                    return false;
                                }

                                return true;
                            });

                            pane.onmouseup = function() {
                                mouseDownEntity = "";
                            };

                            pane.onmouseover = function (e) {
                                e = e || window.event;

                                var target = e.target || e.srcElement;

                                //This manages bar resize, bar menu, and bar selection
                                if (jS.isBusy()) {
                                    return false;
                                }

                                if (!jS.isBar(target)) {
                                    return false;
                                }
                                var bar = $(target),
                                    entity = target.entity,
                                    i = jS.getBarIndex[entity](target);

                                if (i < 0) {
                                    return false;
                                }

                                if (jS.evt.barInteraction.selecting && entity == mouseDownEntity) {
                                    jS.evt.barInteraction.last = i;

                                    jS.cellSetActiveBar(entity, jS.evt.barInteraction.first, jS.evt.barInteraction.last);
                                } else {
                                    jS.resizeBar[entity](bar, i, pane, table);

                                    if (jS.isSheetEditable()) {
                                        jS.controlFactory.barHandleFreeze[entity](pane);

                                        if (entity == "top") {
                                            jS.controlFactory.barMenu[entity](e, i, bar);
                                        }
                                    }
                                }

                                return true;
                            };

                            pane.ondblclick = jS.evt.cellOnDblClick;

                            $pane
                                .bind('contextmenu', paneContextmenuEvent)
                                .disableSelectionSpecial()
                                .bind('cellEdit', jS.evt.cellEdit);
                        }

                        jS.themeRoller.start(table);

                        jS.createSpreadsheet(table, i);

                        jS.checkMinSize(table);

                        jS.controlFactory.tab();

                        var settings = jS.s,
                            hiddenRows = settings.hiddenRows,
                            hiddenColumns = settings.hiddenColumns;

                        if (!hiddenRows.length || !hiddenColumns.length) {
                            hiddenRows = table.attributes['data-hiddenrows'] || {value:''};
                            hiddenColumns = table.attributes['data-hiddencolumns'] || {value:''};

                            if (hiddenRows.value.length > 0)
                                hiddenRows = arrHelpers.toNumbers(hiddenRows.value.split(','));

                            if (hiddenColumns.value.length > 0)
                                hiddenColumns = arrHelpers.toNumbers(hiddenColumns.value.split(','));
                        }

                        enclosure.actionUI.hide(hiddenRows, hiddenColumns, jS.rows(table), jS.cols(table));

                        jS.setChanged(true);
                    },

                    /**
                     * The viewing console for spreadsheet
                     * @returns {*|jQuery|HTMLElement}
                     * @memberOf jS.controlFactory
                     */
                    enclosure:function (table) {
                        var pane = document.createElement('div'),
                            enclosure = document.createElement('div'),
                            $enclosure = $(enclosure),
                            actionUI = new Sheet.ActionUI(enclosure, pane, table, jS.cl.scroll, jS.s.frozenAt[jS.i], $.sheet.max),
                            scrollUI = actionUI.scrollUI;

                        table.size = function() { return jS.sheetSize(table); };

                        scrollUI.onscroll = function() {
                            if (!jS.isBusy()) {
                                var xUpdated = actionUI.scrollTo({axis:'x', pixel:this.scrollLeft}),
                                    yUpdated = actionUI.scrollTo({axis:'y', pixel:this.scrollTop});

                                if (xUpdated || yUpdated) {

                                    if (xUpdated) {
                                        setTimeout(function(){
                                            jS.calcVisibleCol(actionUI);
                                        }, 0);
                                    }

                                    if (yUpdated) {
                                        setTimeout(function() {
                                            jS.calcVisibleRow(actionUI);
                                        }, 0);
                                    }

                                    jS.obj.barHelper().remove();
                                    jS.autoFillerGoToTd();
                                    if (pane.inPlaceEdit) {
                                        pane.inPlaceEdit.goToTd();
                                    }
                                }
                            }
                        };
                        scrollUI.onmousedown = function() {
                            jS.obj.barHelper().remove();
                        };

                        enclosure.actionUI = pane.actionUI = actionUI;

                        enclosure.scrollUI = pane.scrollUI = scrollUI;
                        enclosure.appendChild(enclosure.scrollUI);

                        pane.setAttribute('class', jS.cl.pane + ' ' + jS.cl.uiPane);
                        enclosure.appendChild(pane);
                        enclosure.setAttribute('class', jS.cl.enclosure);

                        enclosure.pane = pane;
                        enclosure.table = table;

                        pane.table = table;
                        pane.enclosure = enclosure;
                        pane.$enclosure = $enclosure;

                        table.pane = pane;
                        table.enclosure = enclosure;
                        table.$enclosure = $enclosure;

                        jS.controls.pane[jS.i] = pane;
                        jS.controls.panes = jS.obj.panes().add(pane);
                        jS.controls.enclosure[jS.i] = $enclosure;
                        jS.controls.enclosures = jS.obj.enclosures().add(enclosure);

                        return enclosure;
                    },

                    /**
                     * Adds a tab for navigation to a spreadsheet
                     * @returns {Node|jQuery}
                     * @memberOf jS.controlFactory
                     */
                    tab:function () {
                        var tab = document.createElement('span'),
                            $tab = jS.controls.tab[jS.i] = $(tab).appendTo(jS.obj.tabContainer());

                        tab.setAttribute('class', jS.cl.tab);
                        jS.sheetTab(true, function(sheetTitle) {
                            tab.innerHTML = sheetTitle;
                        });

                        tab.i = jS.i;
                        tab.setAttribute('class',jS.cl.uiTab + ' ui-corner-bottom');
                        jS.controls.tabs = jS.obj.tabs().add($tab);

                        return tab;
                    },

                    /**
                     * Creates a textarea for a user to put a value in that floats on top of the current selected cell
                     * @param {jQuery|HTMLElement} td the td to be edited
                     * @param {Boolean} selected selects the text in the inline editor
                     * @memberOf jS.controlFactory
                     */
                    inPlaceEdit:function (td, selected) {
                        td = td || jS.obj.tdActive();

                        if (!td.length) {
                            td = $(jS.rowTds(null, 1)[1]);
                            jS.cellEdit(td);
                        }

                        if (!td.length) return;

                        (jS.obj.inPlaceEdit().destroy || emptyFN)();

                        var formula = jS.obj.formula(),
                            val = formula.val(),
                            textarea,
                            $textarea,
                            pane = jS.obj.pane();

                        if (!td[0].isHighlighted) return; //If the td is a dud, we do not want a textarea

                        textarea = document.createElement('textarea');
                        $textarea = $(textarea);
                        pane.inPlaceEdit = textarea;
                        textarea.i = jS.i;
                        textarea.className = jS.cl.inPlaceEdit + ' ' + jS.cl.uiInPlaceEdit;
                        textarea.td = td[0];
                        textarea.goToTd = function() {
                            this.offset = td.position();
                            if (!this.offset.left && !this.offset.right) {
                                $(textarea).hide();
                            } else {
                                this.setAttribute('style',
                                    'left:' + (this.offset.left - 1) + 'px;' +
                                        'top:' + (this.offset.top - 1) + 'px;' +
                                        'width:' + this.td.clientWidth + 'px;' +
                                        'height:' + this.td.clientHeight + 'px;' +
                                        'min-width:' + this.td.clientWidth + 'px;' +
                                        'min-height:' + this.td.clientHeight + 'px;');
                            }
                        };
                        textarea.goToTd();
                        textarea.onkeydown = jS.evt.inPlaceEdit.keydown;
                        textarea.onchange =
                            textarea.onkeyup =
                                function() { formula[0].value = textarea.value; };

                        textarea.onfocus = function () { jS.setNav(false); };

                        textarea.onblur =
                            textarea.onfocusout =
                                function () { jS.setNav(true); };

                        textarea.onpaste = jS.evt.pasteOverCells;

                        textarea.destroy = function () {
                            pane.inPlaceEdit = null;
                            jS.cellLast.isEdit = (textarea.value != val);
                            textarea.parentNode.removeChild(textarea);
                            jS.controls.inPlaceEdit[textarea.i] = false;
                        };

                        pane.appendChild(textarea);

                        textarea.onfocus();

                        jS.controls.inPlaceEdit[jS.i] = textarea;


                        //This is a little trick to get the cursor to the end of the textarea
                        $textarea
                            .focus()
                            .val('')
                            .val(formula[0].value);

                        if (selected) {
                            $textarea.select();
                        }

                        //Make the textarea resizable automatically
                        if ($.fn.elastic) {
                            $(textarea).elastic();
                        }
                    },

                    /**
                     * Created the autoFiller object
                     * @returns {*|jQuery|null}
                     * @memberOf jS.controlFactory
                     * @param {HTMLElement} pane
                     */
                    autoFiller:function (pane) {
                        if (!s.autoFiller) return false;

                        var autoFiller = document.createElement('div'),
                            handle = document.createElement('div'),
                            cover = document.createElement('div');

                        autoFiller.i = jS.i;

                        autoFiller.className = jS.cl.autoFiller + ' ' + jS.cl.uiAutoFiller;
                        handle.className = jS.cl.autoFillerHandle;
                        cover.className = jS.cl.autoFillerCover;

                        autoFiller.onmousedown = function () {
                            var td = jS.obj.tdActive();
                            if (td) {
                                var loc = jS.getTdLocation(td);
                                jS.cellSetActive(td, loc, true, jS.autoFillerNotGroup, function () {
                                    var highlighted = jS.highlighted(),
                                        hLoc = jS.getTdLocation(highlighted.last());
                                    jS.fillUpOrDown(hLoc.row < loc.row || hLoc.col < loc.col);
                                    jS.autoFillerGoToTd(td);
                                    jS.autoFillerNotGroup = false;
                                });
                            }

                            return false;
                        };

                        pane.autoFiller = jS.controls.autoFiller[jS.i] = $(autoFiller);
                        pane.appendChild(autoFiller);
                        return true;
                    }
                },

                /**
                 * Allows grouping of cells
                 * @memberOf jS
                 */
                autoFillerNotGroup:true,


                /**
                 * Sends tab delimited string into cells, usually a paste from external spreadsheet application
                 * @param [oldVal] what formula should be when this is done working with all the values
                 * @returns {Boolean}
                 * @memberOf jS
                 */
                updateCellsAfterPasteToFormula:function (oldVal) {
                    var newValCount = 0,
                        formula = jS.obj.formula(),
                        last = new Date();

                    oldVal = oldVal || formula.val();

                    var loc = {row:jS.cellLast.row, col:jS.cellLast.col},
                        val = formula.val(), //once ctrl+v is hit formula now has the data we need
                        firstValue = val;

                    //at this point we need to check if there is even a cell selected, if not, we can't save the information, so clear formula editor
                    if (loc.row == 0 && loc.col == 0) {
                        return false;
                    }

                    var row = tsv.parse(val);

                    //Single cell value
                    if (!$.isArray(row)) {
                        formula.val(row);
                        jS.fillUpOrDown(false, row);
                        return true;
                    }

                    //values that need put into multi cells
                    for (var i = 0; i < row.length; i++) {
                        jS.cellLast.isEdit = true;
                        var col = row[i];
                        for (var j = 0; j < col.length; j++) {
                            newValCount++;
                            var td = jS.getTd(jS.i, i + loc.row, j + loc.col);

                            td.row = loc.row;
                            td.col = loc.col;

                            if (td.length) {
                                if (!jS.spreadsheets[jS.i] || !jS.spreadsheets[jS.i][i + loc.row] || !jS.spreadsheets[jS.i][i + loc.row][j + loc.col]) continue;
                                var cell = jS.spreadsheets[jS.i][i + loc.row][j + loc.col];
                                if (cell) {
                                    s.parent.one('sheetPreCalculation', function () {
                                        if ((col[j] + '').charAt(0) == '=') { //we need to know if it's a formula here
                                            cell.formula = col[j].substring(1);
                                            cell.value = '';
                                            td.data('formula', col[j]);
                                        } else {
                                            cell.formula = '';
                                            cell.value = col[j];
                                            td.removeData('formula');
                                        }
                                    });
                                    jS.calcDependencies.call(cell);

                                    if (i == 0 && j == 0) { //we have to finish the current edit
                                        firstValue = col[j];
                                    }
                                }
                            }
                        }
                    }

                    if (val != firstValue) {
                        formula.val(firstValue);
                    }

                    jS.fillUpOrDown(false, firstValue);

                    jS.evt.cellEditDone(true);

                    return true;
                },

                /**
                 * Event handlers for instance
                 * @memberOf jS
                 * @namespace
                 */
                evt:{

                    inPlaceEdit:{
                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.inPlaceEdit
                         */
                        enter:function (e) {
                            if (e.shiftKey) {
                                return true;
                            }
                            return jS.evt.cellSetActiveFromKeyCode(e, true);
                        },

                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.inPlaceEdit
                         */
                        tab:function (e) {
                            if (e.shiftKey) {
                                return true;
                            }
                            return jS.evt.cellSetActiveFromKeyCode(e, true);
                        },
                        /**
                         * Edits the textarea that appears over cells for in place edit
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.inPlaceEdit
                         */
                        keydown:function (e) {
                            e = e || window.event;
                            jS.trigger('sheetFormulaKeydown', [true]);

                            switch (e.keyCode) {
                                case key.ENTER:
                                    return jS.evt.inPlaceEdit.enter(e);
                                    break;
                                case key.TAB:
                                    return jS.evt.inPlaceEdit.tab(e);
                                    break;
                                case key.ESCAPE:
                                    jS.evt.cellEditAbandon();
                                    return false;
                                    break;
                            }
                        }
                    },

                    formula:{
                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.formula
                         */
                        keydown:function (e) {
                            e = e || window.event;
                            if (jS.readOnly[jS.i]) return false;
                            if (jS.cellLast.row < 0 || jS.cellLast.col < 0) return false;

                            jS.trigger('sheetFormulaKeydown', [false]);

                            switch (e.keyCode) {
                                case key.C:
                                    if (e.ctrlKey) {
                                        return jS.evt.document.copy(e);
                                    }
                                case key.X:
                                    if (e.ctrlKey) {
                                        return jS.evt.document.cut(e);
                                    }
                                case key.Y:
                                    if (e.ctrlKey) {
                                        jS.evt.document.redo(e);
                                        return false;
                                    }
                                    break;
                                case key.Z:
                                    if (e.ctrlKey) {
                                        jS.evt.document.undo(e);
                                        return false;
                                    }
                                    break;
                                case key.ESCAPE:
                                    jS.evt.cellEditAbandon();
                                    return true;
                                    break;
                                case key.ENTER:
                                    jS.evt.cellSetActiveFromKeyCode(e, true);
                                    return false;
                                    break;
                            }

                            jS.cellLast.isEdit = true;
                        },

                        /**
                         * Helper for events
                         * @param {Boolean} ifTrue
                         * @param e {Object} jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.keydownHandler
                         */
                        If:function (ifTrue, e) {
                            if (ifTrue) {
                                jS.obj.tdActive().dblclick();
                                return true;
                            }
                            return false;
                        }
                    },

                    /**
                     * Key down handlers
                     * @memberOf jS.evt
                     */
                    document:{
                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.document
                         */
                        enter:function (e) {
                            if (!jS.cellLast.isEdit && !e.ctrlKey) {
                                jS.obj.tdActive().dblclick();
                            }
                            return false;
                        },

                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.document
                         */
                        tab:function (e) {
                            jS.evt.cellSetActiveFromKeyCode(e);
                        },

                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.document
                         */
                        findCell:function (e) {
                            if (e.ctrlKey) {
                                jS.cellFind();
                                return false;
                            }
                            return true;
                        },

                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.document
                         */
                        redo:function (e) {
                            if (e.ctrlKey && !jS.cellLast.isEdit) {
                                jS.undo.manager.redo();
                                return false;
                            }
                            return true;
                        },

                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.document
                         */
                        undo:function (e) {
                            if (e.ctrlKey && !jS.cellLast.isEdit) {
                                jS.undo.manager.undo();
                                return false;
                            }
                            return true;
                        },

                        /**
                         * Copy what is in the highlighted tds
                         * @param [e]
                         * @param [clearValue]
                         * @returns {Boolean}
                         */
                        copy:function (e, clearValue) {
                            var tds = jS.highlighted(true),
                                formula = jS.obj.formula(),
                                oldValue = formula.val(),
                                cellsTsv = jS.toTsv(tds, clearValue);

                            formula
                                .val(cellsTsv)
                                .focus()
                                .select();

                            $document
                                .one('keyup', function () {
                                    if (clearValue) {
                                        formula.val('');
                                    } else {
                                        formula.val(oldValue);
                                    }
                                });

                            return true;
                        },

                        cut:function (e) {
                            return this.copy(e, true);
                        },

                        /**
                         * Manages the page up and down buttons
                         * @param {Boolean} [reverse] Go up or down
                         * @returns {Boolean}
                         * @memberOf jS.evt.document
                         */
                        pageUpDown:function (reverse) {
                            var size = jS.sheetSize(),
                                pane = jS.obj.pane(),
                                paneHeight = pane.clientHeight,
                                prevRowsHeights = 0,
                                thisRowHeight = 0,
                                td,
                                i;

                            if (reverse) { //go up
                                for (i = jS.cellLast.row; i > 0 && prevRowsHeights < paneHeight; i--) {
                                    td = jS.getTd(jS.i, i, 1);
                                    if (!td.data('hidden') && td.is(':hidden')) td.show();
                                    prevRowsHeights += td.parent().height();
                                }
                            } else { //go down
                                for (i = jS.cellLast.row; i < size.rows && prevRowsHeights < paneHeight; i++) {
                                    td = jS.getTd(jS.i, i, 1);
                                    prevRowsHeights += td.parent().height();
                                }
                            }
                            jS.cellEdit(td);

                            return false;
                        },

                        /**
                         *
                         * @param {Object} e jQuery event
                         * @returns {*}
                         * @memberOf jS.evt.document
                         */
                        keydown:function (e) {
                            e = e || window.event;
                            if (jS.readOnly[jS.i]) return false;
                            if (jS.cellLast.row < 0 || jS.cellLast.col < 0) return false;
                            var td = jS.cellLast.td;

                            if (jS.nav) {
                                //noinspection FallthroughInSwitchStatementJS
                                switch (e.keyCode) {
                                    case key.DELETE:
                                        jS.toTsv(null, true);
                                        jS.obj.formula().val('');
                                        break;
                                    case key.TAB:
                                        jS.evt.document.tab(e);
                                        break;
                                    case key.ENTER:
                                        jS.evt.cellSetActiveFromKeyCode(e);
                                        break;
                                    case key.LEFT:
                                    case key.UP:
                                    case key.RIGHT:
                                    case key.DOWN:
                                        (e.shiftKey ? jS.evt.cellSetHighlightFromKeyCode(e) : jS.evt.cellSetActiveFromKeyCode(e));
                                        break;
                                    case key.PAGE_UP:
                                        jS.evt.document.pageUpDown(true);
                                        break;
                                    case key.PAGE_DOWN:
                                        jS.evt.document.pageUpDown();
                                        break;
                                    case key.HOME:
                                    case key.END:
                                        jS.evt.cellSetActiveFromKeyCode(e);
                                        break;
                                    case key.V:
                                        if (e.ctrlKey) {
                                            return jS.evt.formula.If(!jS.evt.pasteOverCells(e), e);
                                        } else {
                                            td.trigger('cellEdit');
                                            return true;
                                        }
                                        break;
                                    case key.Y:
                                        if (e.ctrlKey) {
                                            jS.evt.document.redo(e);
                                            return false;
                                        } else {
                                            td.trigger('cellEdit');
                                            return true;
                                        }
                                        break;
                                    case key.Z:
                                        if (e.ctrlKey) {
                                            jS.evt.document.undo(e);
                                            return false;
                                        } else {
                                            td.trigger('cellEdit');
                                            return true;
                                        }
                                        break;
                                    case key.ESCAPE:
                                        jS.evt.cellEditAbandon();
                                        break;
                                    case key.F:
                                        if (e.ctrlKey) {
                                            return jS.evt.formula.If(jS.evt.document.findCell(e), e);
                                        } else {
                                            td.trigger('cellEdit');
                                            return true;
                                        }
                                        break;
                                    case key.CAPS_LOCK:
                                    case key.SHIFT:
                                    case key.ALT:
                                        break;
                                    case key.CONTROL: //we need to filter these to keep cell state
                                        jS.obj.formula().focus().select();
                                        return true;
                                        break;
                                    default:
                                        td.trigger('cellEdit');
                                        return true;
                                        break;
                                }
                                return false;
                            }
                        }
                    },

                    /**
                     * Used for pasting from other spreadsheets
                     * @param {Object} e jQuery event
                     * @returns {Boolean}
                     * @memberOf jS.evt
                     */
                    pasteOverCells:function (e) {
                        e = e || window.event;
                        if (e.ctrlKey || e.type == "paste") {
                            var fnAfter = function () {
                                jS.updateCellsAfterPasteToFormula();
                            };

                            var $doc = $document
                                .one('keyup', function () {
                                    fnAfter();
                                    fnAfter = function () {
                                    };
                                    $doc.mouseup();
                                })
                                .one('mouseup', function () {
                                    fnAfter();
                                    fnAfter = function () {
                                    };
                                    $doc.keyup();
                                });

                            jS.setDirty(true);
                            jS.setChanged(true);
                            return true;
                        }

                        return false;
                    },

                    /**
                     * Updates a cell after edit afterward event "sheetCellEdited" is called w/ params (td, row, col, spreadsheetIndex, sheetIndex)
                     * @param {Boolean} [force] if set to true forces a calculation of the selected sheet
                     * @memberOf jS.evt
                     */
                    cellEditDone:function (force) {
                        (jS.obj.inPlaceEdit().destroy || emptyFN)();
                        if (jS.cellLast.isEdit || force) {
                            var formula = jS.obj.formula(),
                                td = jS.obj.tdActive();

                            if (jS.isFormulaEditable(td)) {
                                //Lets ensure that the cell being edited is actually active
                                if (td && jS.cellLast.row > 0 && jS.cellLast.col > 0) {

                                    //This should return either a val from textbox or formula, but if fails it tries once more from formula.
                                    var v = formula.val(),
                                        cell = td[0].jSCell;

                                    if (!cell.edited) {
                                        cell.edited = true;
                                        jS.controls.cellsEdited[jS.i] = jS.obj.cellsEdited().add(cell);
                                    }

                                    s.parent.one('sheetPreCalculation', function () {
                                        if (v.charAt(0) == '=' && jS.formulaParser) {
                                            td.data('formula', v);
                                            cell.value = v;
                                            cell.formula = v;
                                        } else {
                                            td.removeData('formula');
                                            cell.value = v;
                                            cell.formula = '';
                                        }
                                    });
                                    jS.calcDependencies.call(cell);

                                    //formula.focus().select();
                                    jS.cellLast.isEdit = false;

                                    //perform final function call
                                    jS.trigger('sheetCellEdited', [cell]);
                                }
                            }
                        }
                    },

                    /**
                     * Abandons a cell edit
                     * @param {Boolean} [skipCalc] if set to true will skip sheet calculation;
                     * @memberOf jS.evt
                     */
                    cellEditAbandon:function (skipCalc) {
                        (jS.obj.inPlaceEdit().destroy || emptyFN)();
                        jS.themeRoller.bar.clearActive();
                        jS.themeRoller.cell.clearHighlighted(null, true);

                        if (!skipCalc) {
                            jS.calc();
                        }

                        jS.cellLast.td = $([]);
                        jS.cellLast.row = 0;
                        jS.cellLast.col = 0;
                        jS.rowLast = 0;
                        jS.colLast = 0;
                        jS.highlightedLast.start = {row:0,col:0};
                        jS.highlightedLast.end = {row:0,col:0};

                        jS.labelUpdate('', true);
                        jS.obj.formula()
                            .val('')
                            .blur();

                        jS.autoFillerHide();

                        return false;
                    },


                    /**
                     * Highlights a cell from a key code
                     * @param {Object} e jQuery event
                     * @returns {Boolean}
                     * @memberOf jS.evt
                     */
                    cellSetHighlightFromKeyCode:function (e) {
                        var grid = jS.highlightedLastOrdered(),
                            size = jS.sheetSize(),
                            td = jS.obj.tdActive(),
                            loc = jS.getTdLocation(td),
                            start = grid.start,
                            end = grid.end;

                        switch (e.keyCode) {
                            case key.UP:
                                if (start.row < loc.row) {
                                    start.row--;
                                    start.row = math.max(start.row, 1);
                                    break;
                                }

                                end.row--;
                                end.row = math.max(end.row, 1);

                                break;
                            case key.DOWN:
                                //just beginning the highlight
                                if (start.row === start.end) {
                                    start.row++;
                                    start.row = math.min(start.row, size.rows);
                                    break;
                                }

                                //if the highlight is above the active cell, then we have selected up and need to move down
                                if (start.row < loc.row) {
                                    start.row++;
                                    start.row = math.max(start.row, 1);
                                    break;
                                }

                                //otherwise we increment the row, and limit it to the size of the total grid
                                end.row++;
                                end.row = math.min(end.row, size.rows);

                                break;
                            case key.LEFT:
                                if (start.col < loc.col) {
                                    start.col--;
                                    start.col = math.max(start.col, 1);
                                    break;
                                }

                                end.col--;
                                end.col = math.max(end.col, 1);

                                break;
                            case key.RIGHT:
                                if (start.col < loc.col) {
                                    start.col++;
                                    start.col = math.min(start.col, size.cols);
                                    break;
                                }

                                end.col++;
                                end.col = math.min(end.col, size.cols);

                                break;
                        }

                        //highlight the cells
                        jS.highlightedLast.start = start;
                        jS.highlightedLast.end = end;

                        jS.cycleCellArea(function (o) {
                            jS.themeRoller.cell.setHighlighted(o.td);
                        }, start, end);

                        return false;
                    },


                    /**
                     * Activates a cell from a key code
                     * @param {Object} e jQuery event
                     * @param {Boolean} [skipMove]
                     * @returns {Boolean}
                     * @memberOf jS.evt
                     */
                    cellSetActiveFromKeyCode:function (e, skipMove) {
                        var loc = {
                                row: jS.cellLast.row,
                                col: jS.cellLast.col
                            },
                            overrideIsEdit = false,
                            highlighted,
                            doNotClearHighlighted = false;

                        switch (e.keyCode) {
                            case key.UP:
                                loc.row--;
                                break;
                            case key.DOWN:
                                loc.row++;
                                break;
                            case key.LEFT:
                                loc.col--;
                                break;
                            case key.RIGHT:
                                loc.col++;
                                break;
                            case key.ENTER:
                                loc = jS.evt.incrementAndStayInGrid(jS.highlightedLastOrdered(), loc, 'row', 'col', e.shiftKey);
                                overrideIsEdit = true;
                                highlighted = jS.highlighted();
                                if (highlighted.length > 1) {
                                    doNotClearHighlighted = true;
                                } else {
                                    if (!skipMove) {
                                        loc.row += (e.shiftKey ? -1 : 1);
                                    }
                                    if (s.autoAddCells && loc.row > jS.sheetSize().rows) {
                                        jS.controlFactory.addRow();
                                    }
                                }
                                break;
                            case key.TAB:
                                loc = jS.evt.incrementAndStayInGrid(jS.highlightedLastOrdered(), loc, 'col', 'row', e.shiftKey);
                                overrideIsEdit = true;
                                highlighted = jS.highlighted();
                                if (highlighted.length > 1) {
                                    doNotClearHighlighted = true;
                                } else {
                                    if (!skipMove) {
                                        loc.col += (e.shiftKey ? -1 : 1);
                                    }
                                    if (s.autoAddCells && loc.col > jS.sheetSize().cols) {
                                        jS.controlFactory.addColumn();
                                    }
                                }
                                break;
                            case key.HOME:
                                loc.col = 1;
                                break;
                            case key.END:
                                loc.col = jS.obj.tdActive().parent().children('td').length - 1;
                                break;
                        }

                        //we check here and make sure all values are above 0, so that we get a selected cell
                        loc.col = loc.col || 1;
                        loc.row = loc.row || 1;

                        //to get the td could possibly make keystrokes slow, we prevent it here so the user doesn't even know we are listening ;)
                        if (!jS.cellLast.isEdit || overrideIsEdit) {
                            //get the td that we want to go to
                            var td = jS.getTd(jS.i, loc.row, loc.col);

                            //if the td exists, lets go to it
                            if (td) {
                                jS.cellEdit(td, null, doNotClearHighlighted);
                                return false;
                            }
                        }
                        //default, can be overridden above
                        return true;
                    },

                    /**
                     * Calculate position for either horizontal movement or vertical movement within a grid, both forward and reverse
                     * @param {Object} grid
                     * @param {Object} loc
                     * @param {String} locA
                     * @param {String} locB
                     * @param {Boolean} reverse
                     * @returns {Object} loc
                     * @memberOf jS.evt
                     */
                    incrementAndStayInGrid: function (grid, loc, locA, locB, reverse) {
                        if (reverse) {
                            loc[locA]--;
                            if (loc[locA] < grid.start[locA]) {
                                loc[locA] = grid.end[locA];
                                loc[locB]--;
                            }
                            if (loc[locB] < grid.start[locB]) {
                                loc[locB] = grid.end[locB];
                            }
                        } else {
                            loc[locA]++;
                            if (loc[locA] > grid.end[locA]) {
                                loc[locA] = grid.start[locA];
                                loc[locB]++;
                            }
                            if (loc[locB] > grid.end[locB]) {
                                loc[locB] = grid.start[locB];
                            }
                        }

                        return loc;
                    },

                    /**
                     * Cell on mouse down
                     * @param {Object} e jQuery event
                     * @memberOf jS.evt
                     */
                    cellOnMouseDown:function (e) {


                        jS.obj.formula().blur();
                        if (e.shiftKey) {
                            jS.getTdRange(e, jS.obj.formula().val());
                        } else {
                            jS.cellEdit($(e.target), true);
                        }
                    },

                    /**
                     * Cell on double click
                     * @param {Object} e jQuery event
                     * @memberOf jS.evt
                     */
                    cellOnDblClick:function (e) {
                        if (jS.isBusy()) {
                            return false;
                        }

                        jS.controlFactory.inPlaceEdit();

                        return true;
                    },

                    cellEdit: function(e) {
                        if (jS.isBusy()) {
                            return false;
                        }

                        jS.controlFactory.inPlaceEdit(null, true);

                        return true;
                    },

                    /**
                     * Handles bar events, used for highlighting and activating
                     * @memberOf jS.evt
                     * @namespace
                     */
                    barInteraction:{

                        /**
                         * The first bar that received the event (mousedown)
                         * @memberOf jS.evt.barInteraction
                         */
                        first:0,

                        /**
                         * The last bar that received the event (mousedown)
                         * @memberOf jS.evt.barInteraction
                         */
                        last:0,

                        /**
                         * Tracks if we are in select mode
                         * @memberOf jS.evt.barInteraction
                         */
                        selecting:false,

                        /**
                         * Manages the bar selection
                         * @param {Object} o target
                         * @returns {*}
                         * @memberOf jS.evt.barInteraction
                         */
                        select:function (o) {
                            if (!o) return;
                            if (!o.type == 'bar') return;
                            var entity = o.entity, //returns "top" or "left";
                                i = jS.getBarIndex[entity](o);

                            if (i < 0) return false;

                            jS[entity + 'Last'] = i; //keep track of last column for inserting new columns
                            jS.evt.barInteraction.last = jS.evt.barInteraction.first = i;

                            jS.cellSetActiveBar(entity, jS.evt.barInteraction.first, jS.evt.barInteraction.last);
                            jS.evt.barInteraction.first = jS.evt.barInteraction.last = jS[entity + 'Last'] = i;

                            jS.evt.barInteraction.selecting = true;
                            $document
                                .one('mouseup', function () {
                                    jS.evt.barInteraction.selecting = false;
                                });

                            return false;
                        }
                    }
                },

                /**
                 *
                 * @param {Number} start index to start from
                 * @memberOf jS
                 */
                refreshColumnLabels:function (start) {
                    start = start || 0;

                    jS.obj.barMenuParentTop().trigger('destroy');

                    var tds = jS.controls.bar.x.td[jS.i];

                    if (!tds) return;

                    for (var i = start; i < tds.length; i++) {
                        if (i) {//greater than 1 (corner)
                            tds[i].text(jSE.columnLabelString(tds[i][0].cellIndex));
                        }
                    }
                },


                /**
                 *
                 * @param {Number} start index to start from
                 * @param {Number} [end] index to end at
                 * @memberOf jS
                 */
                refreshRowLabels:function (start, end) {
                    start = start || 0;

                    var tds = jS.controls.bar.y.td[jS.i];

                    if (!tds) return;

                    end = end || tds.length;

                    for (var i = start; i < end; i++) {
                        if (i) {
                            $(tds[i]).text(tds[i][0].parentNode.rowIndex);
                        }
                    }
                },

                /**
                 * Detects if an object is a td within a spreadsheet's table
                 * @param {jQuery|HTMLElement} o target
                 * @returns {Boolean}
                 * @memberOf jS
                 */
                isCell:function (o) {
                    if (o && o.tagName && o.tagName == 'TD' && o.type && o.type == 'cell') {
                        return true;
                    }
                    return false;
                },

                /**
                 * Detects if an object is a bar td within a spreadsheet's table
                 * @param {jQuery|HTMLElement} o target
                 * @returns {Boolean}
                 * @memberOf jS
                 */
                isBar:function (o) {
                    if (o && o.tagName && o.tagName == 'TD' && o.type && o.type == 'bar') {
                        return true;
                    }
                    return false;
                },

                /**
                 * Tracks read state of spreadsheet
                 * @memberOf jS
                 */
                readOnly:[],

                /**
                 * Detects read state of a spreadsheet
                 * @param {Number} [i] index of spreadsheet within instance
                 * @returns {Boolean}
                 * @memberOf jS
                 */
                isSheetEditable:function (i) {
                    i = i || jS.i;
                    return (
                        s.editable == true && !jS.readOnly[i]
                        );
                },

                /**
                 * Detects read state of formula of an object
                 * @param {jQuery|HTMLElement} o target
                 * @returns {Boolean}
                 * @memberOf jS
                 */
                isFormulaEditable:function (o) {
                    if (s.lockFormulas) {
                        if (o.data('formula') !== u) {
                            return false;
                        }
                    }
                    return true;
                },

                /**
                 * Toggles full screen mode
                 * @memberOf jS
                 */
                toggleFullScreen:function () {
                    if (!jS) return;
                    jS.evt.cellEditDone();
                    var fullScreen = jS.obj.fullScreen(),
                        pane = jS.obj.pane();
                    if (fullScreen.is(':visible')) {
                        $window.unbind('jSResize');
                        $body.removeClass('bodyNoScroll');
                        s.parent = fullScreen[0].origParent;

                        s.parent.prepend(fullScreen.children());

                        fullScreen.remove();

                        jS.sheetSyncSize();
                        pane.resizeScroll();
                        jS.trigger('sheetFullScreen', [false]);
                    } else { //here we make a full screen
                        $body.addClass('bodyNoScroll');

                        var parent = $(s.parent),
                            fullScreen = document.createElement('div'),
                            events = $._data(s.parent[0], 'events');

                        fullScreen.className = jS.cl.fullScreen + ' ' + jS.cl.uiFullScreen + ' ' + jS.cl.parent;

                        fullScreen.origParent = parent;
                        s.parent = jS.controls.fullScreen = $(fullScreen)
                            .append(parent.children())
                            .appendTo($body);

                        $window
                            .bind('resize', function() {
                                $window.trigger('jSResize');
                            })
                            .bind('jSResize', function () {
                                this.w = $window.width();
                                this.h = $window.height();
                                s.parent
                                    .width(this.w)
                                    .height(this.h);

                                jS.sheetSyncSize();
                                pane.resizeScroll();
                            })
                            .trigger('jSResize');


                        parent.trigger('sheetFullScreen', [true]);

                        for (var event in events) {
                            for (var i = 0; i < events[event].length; i++) {
                                s.parent.bind(event, events[event][i].handler);
                            }
                        }
                    }
                },

                /**
                 * Assists in rename of spreadsheet
                 * @memberOf jS
                 */
                renameSheet:function (i) {
                    if (n(i)) {
                        return false;
                    }

                    if (i > -1) {
                        jS.sheetTab();
                    }

                    return true;
                },

                /**
                 * Switches spreadsheet
                 * @param {Number} i index of spreadsheet within instance
                 * @memberOf jS
                 */
                switchSheet:function (i) {
                    if (n(i)) {
                        return false;
                    }

                    if (i == -1) {
                        jS.addSheet();
                    } else if (i != jS.i) {
                        jS.setActiveSheet(i);
                        jS.calc(i);
                    }

                    return true;
                },

                /**
                 * Makes table object usable by sheet
                 * @param {jQuery|HTMLElement} table
                 * @returns {*}
                 * @memberOf jS
                 */
                tuneTableForSheetUse:function (table) {
                    var $table = $(table);
                    jS.controls.table[jS.i] = $table
                        .addClass(jS.cl.table)
                        .addClass(jS.cl.uiTable)
                        .attr('id', jS.id + jS.i)
                        .attr('border', '1px')
                        .attr('cellpadding', '0')
                        .attr('cellspacing', '0');

                    jS.formatTable(table);
                    jS.sheetDecorateRemove(false, $table);

                    jS.controls.tables = jS.obj.tables().add(table);

                    //override frozenAt settings with table's data-frozenatrow and data-frozenatcol
                    var frozenAtRow = $table.attr('data-frozenatrow') * 1,
                        frozenAtCol = $table.attr('data-frozenatcol') * 1;

                    if (!jS.s.frozenAt[jS.i]) jS.s.frozenAt[jS.i] = {row:0, col:0};
                    if (frozenAtRow) jS.s.frozenAt[jS.i].row = frozenAtRow;
                    if (frozenAtCol) jS.s.frozenAt[jS.i].col = frozenAtCol;
                },

                /**
                 * Cycles through all the td's and turns table into spreadsheet
                 * @param {HTMLElement} table spreadsheet
                 * @param {Number} i spreadsheet index within instance
                 * @memberOf jS
                 */
                createSpreadsheet:function (table, i) {
                    table.spreadsheet = jS.spreadsheets[i] = []; //reset the sheet's spreadsheet

                    var rows = jS.rows(table),
                        row = rows.length - 1,
                        col;
                    if (row < 0) return;
                    do {
                        col = rows[row].children.length - 1;
                        if (col < 0) return;
                        do {
                            var td = rows[row].children[col];
                            if (row > 0 && col > 0) {
                                jS.createCell(i, row, col);
                            } else {
                                if (col == 0 && row > 0) { //barleft
                                    td.type = 'bar';
                                    td.entity = 'left';
                                    td.innerHTML = row;
                                    td.className = jS.cl.barLeft + ' ' + jS.cl.barLeft + '_' + jS.i + ' ' + jS.cl.uiBar;
                                    td.setAttribute('style', 'height:' + td.nextSibling.style.height); //This element is generated and needs to track the height of the item just before it
                                }

                                if (row == 0 && col > 0) { //bartop
                                    td.type = 'bar';
                                    td.entity = 'top';
                                    td.innerHTML = jSE.columnLabelString(col);
                                    td.className = jS.cl.barTop + ' ' + jS.cl.barTop + '_' + jS.i + ' ' + jS.cl.uiBar;
                                }

                                if (row == 0 && col == 0) { //corner
                                    td.type = 'bar';
                                    td.entity = 'corner';
                                    td.className = jS.cl.uiBar + ' ' + ' ' + jS.cl.barCorner;
                                    jS.controls.bar.corner[jS.i] = td;
                                }
                            }
                        } while (col--);
                    } while (row--);
                },

                toggleHideRow: function(i) {
                    i = i || jS.rowLast;
                    if (!i) return;

                    var row = jS.rows()[i],
                        actionUI = jS.obj.pane().actionUI;

                    actionUI.toggleHideRow(row, i);
                    jS.autoFillerGoToTd();
                },
                toggleHideColumn: function(i) {
                    i = i || jS.colLast;
                    if (!i) return;

                    var col = jS.cols()[i],
                        actionUI = jS.obj.pane().actionUI;

                    actionUI.toggleHideColumn(col, i);
                    jS.autoFillerGoToTd();
                },
                rowShowAll: function() {
                    jS.obj.pane().actionUI.rowShowAll();
                },
                columnShowAll: function() {
                    jS.obj.pane().actionUI.columnShowAll();
                },
                /**
                 * Merges cells together
                 * @param {Object} [tds]
                 * @memberOf jS
                 */
                merge:function (tds) {
                    tds = tds || jS.highlighted();
                    if (!tds.length) {
                        return;
                    }
                    var
                        cellsValue = [],
                        firstTd = tds[0],
                        lastTd = tds[tds.length - 1],
                        firstLocRaw = jS.getTdLocation(firstTd),
                        lastLocRaw = jS.getTdLocation(lastTd),
                        firstLoc = {},
                        lastLoc = {},
                        colSpan = 0,
                        rowSpan = 0,
                        last = new Date(),
                        i = tds.length - 1,
                        cell,
                        _td,
                        td,
                        $td,
                        loc;

                    if (firstLocRaw.row) {
                        jS.setDirty(true);
                        jS.setChanged(true);

                        if (firstLocRaw.row < lastLocRaw.row) {
                            firstLoc.row = firstLocRaw.row;
                            lastLoc.row = lastLocRaw.row;
                            td = firstTd;
                        } else {
                            firstLoc.row = lastLocRaw.row;
                            lastLoc.row = firstLocRaw.row;
                            td = lastTd;
                        }

                        if (td.getAttribute('rowSpan') || td.getAttribute('colSpan')) {
                            return false;
                        }

                        $td = $(td);

                        if (firstLocRaw.col < lastLocRaw.col) {
                            firstLoc.col = firstLocRaw.col;
                            lastLoc.col = lastLocRaw.col;
                        } else {
                            firstLoc.col = lastLocRaw.col;
                            lastLoc.col = firstLocRaw.col;
                        }

                        rowSpan = (lastLoc.row - firstLoc.row) + 1;
                        colSpan = (lastLoc.col - firstLoc.col) + 1;

                        loc = jS.getTdLocation(td);

                        do {
                            _td = tds[i];
                            cell = _td.jSCell;
                            if (cell.formula || cell.value) {
                                cellsValue.unshift(cell.formula ? "(" + cell.formula.substring(1) + ")" : cell.value);
                            }
                            s.parent.one('sheetPreCalculation', function () {
                                if (_td.cellIndex != loc.col || _td.parentNode.rowIndex != loc.row) {
                                    cell.formula = null;
                                    cell.value = '';
                                    cell.html = '';
                                    cell.defer = td.jSCell;
                                    cell.calcLast = last;

                                    _td.removeAttribute('data-formula');
                                    _td.removeAttribute('data-celltype')
                                    _td.innerHTML = '';
                                    _td.style.display = 'none';
                                    _td.colSpan = colSpan - (_td.cellIndex - td.cellIndex);
                                    _td.rowSpan = rowSpan - (_td.parentNode.rowIndex - td.parentNode.rowIndex);
                                }
                            });

                            jS.calcDependencies.call(cell);
                        } while(i--);

                        td.jSCell.value = cellsValue.join(' ');
                        td.jSCell.formula = (td.jSCell.formula ? cellsValue.join(' ') : '');
                        td.jSCell.calcLast = last;

                        td.style.display = '';
                        td.setAttribute('rowSpan', rowSpan);
                        td.setAttribute('colSpan', colSpan);

                        jS.calcDependencies.call(td.jSCell);
                        jS.evt.cellEditDone();
                        jS.autoFillerGoToTd($td);
                        jS.cellSetActive($td, loc);
                    }
                    return true;
                },

                /**
                 * Unmerges cells together
                 * @param {jQuery} [$td]
                 * @memberOf jS
                 */
                unmerge:function ($td) {
                    $td = $td || jS.highlighted();
                    if (!$td) {
                        return;
                    }
                    var td = $td[0],
                        loc = jS.getTdLocation(td),
                        last = new Date(),
                        row = math.max(td.getAttribute('rowSpan') * 1, 1) - 1,
                        col = math.max(td.getAttribute('colSpan') * 1, 1) - 1,
                        i = row + loc.row,
                        j,
                        _td,
                        tds = [];

                    if (row == 0 && col == 0) {
                        return false;
                    }

                    do {
                        j = loc.col + col;
                        do {
                            _td = jS.getTd(jS.i, i, j)[0];
                            _td.style.display = '';
                            _td.removeAttribute('colSpan');
                            _td.removeAttribute('rowSpan');
                            _td.jSCell.defer = null;

                            jS.calcDependencies.call(_td.jSCell, last);

                            tds.push(_td);
                        } while (j-- > loc.col);
                    } while (i-- > loc.row);

                    jS.evt.cellEditDone();
                    jS.autoFillerGoToTd($td);
                    jS.cellSetActive($td, loc);
                    jS.themeRoller.cell.setHighlighted($(tds));
                    return true;
                },

                /**
                 * Fills values down or up to highlighted cells from active cell;
                 * @param {Boolean} [goUp] default is down, when set to true value are filled from bottom, up;
                 * @param {String} [v] the value to set cells to, if not set, formula will be used;
                 * @param {Object} [cells]
                 * @memberOf jS
                 * @returns {Boolean}
                 */
                fillUpOrDown:function (goUp, v, cells) {
                    jS.evt.cellEditDone();
                    cells = cells || jS.highlighted(true);

                    if (cells.length < 1) {
                        return false;
                    }

                    var activeTd = jS.obj.tdActive(),
                        last = new Date();

                    if (cells.length < 1) {
                        return false;
                    }

                    var startLoc = jS.getTdLocation(cells[0].td),
                        endLoc = jS.getTdLocation(cells[cells.length - 1].td),
                        relativeLoc = jS.getTdLocation(activeTd),
                        offset = {
                            row:0,
                            col:0
                        },
                        newV = v || activeTd[0].jSCell.value,
                        isNumber = false,
                        i = cells.length - 1,
                        fn = function() {};

                    v = v || activeTd[0].jSCell.value;

                    if (i >= 0) {
                        if (v.charAt && v.charAt(0) == '=') {
                            if (i >= 0) {
                                do {
                                    if (!goUp) {
                                        offset.row = relativeLoc.row - endLoc.row;
                                        offset.col = relativeLoc.col - endLoc.col;
                                    } else {
                                        offset.row = relativeLoc.row - startLoc.row;
                                        offset.col = relativeLoc.col - startLoc.col;
                                    }

                                    newV = jS.reparseFormula(v, offset);

                                    s.parent.one('sheetPreCalculation', function () {
                                        cells[i].formula = newV;
                                        cells[i].value = '';
                                        cells[i].td.data('formula', newV);
                                    });

                                    jS.calcDependencies.call(cells[i], last);
                                } while (i--);
                                return true;
                            }
                        } else {
                            if ((isNumber = !n(newV)) || newV.length > 0) {
                                if (isNumber && newV != '') {
                                    newV *= 1;

                                    if (goUp) {
                                        newV -= cells.length - 1;
                                    }
                                    fn = function() {
                                        newV++;
                                    };
                                }
                            }

                            do {
                                s.parent.one('sheetPreCalculation', function () {
                                    cells[i].formula = '';
                                    cells[i].value = newV + '';
                                    cells[i].td.removeData('formula');
                                });

                                jS.calcDependencies.call(cells[i], last);

                                fn();
                            } while (i--);
                            return true;
                        }
                    }

                    return false;
                },

                /**
                 * Turns values into a tab separated value
                 * @param {Object} [cells]
                 * @param {String} [clearValue]
                 * @param {Object} [fnEach]
                 * @memberOf jS
                 * @returns {String}
                 */
                toTsv:function (cells, clearValue, fnEach) {
                    cells = cells || jS.highlighted(true);
                    if (cells.type) {
                        cells = [cells];
                    }
                    fnEach = fnEach || function (loc, cell) {
                        if (clearValue) {
                            s.parent.one('sheetPreCalculation', function () {
                                cell.formula = '';
                                cell.value = '';
                            });
                            jS.calcDependencies.call(cell, last);
                        }
                    };
                    var cellValues = [],
                        firstLoc,
                        lastLoc,
                        minLoc = {},
                        last = new Date(),
                        i = cells.length - 1,
                        row,
                        col;

                    if (i >= 0) {
                        firstLoc = jS.getTdLocation(cells[0].td);
                        lastLoc = jS.getTdLocation(cells[cells.length - 1].td);
                        minLoc.row = math.min(firstLoc.row, lastLoc.row);
                        minLoc.col = math.min(firstLoc.col, lastLoc.col);
                        do {
                            var loc = jS.getTdLocation(cells[i].td),
                                value = (cells[i].formula ? '=' + cells[i].formula : cells[i].value);

                            row = math.abs(loc.row - minLoc.row);
                            col = math.abs(loc.col - minLoc.col);

                            if (!cellValues[row]) cellValues[row] = [];

                            if ((value += '').match(/\n/)) {
                                value = '"' + value + '"';
                            }

                            cellValues[row][col] = (value || '');

                            fnEach.call(cells[i].td, loc, cells[i]);
                        } while (i-- > 0);


                        i = cellValues.length - 1;
                        do {
                            cellValues[i] = cellValues[i].join('\t');
                        } while (i-- > 0);

                        return cellValues.join('\n');
                    }
                    return '';
                },

                /**
                 * Makes cell formulas increment within a range
                 * @param {Object} loc expects keys row,col
                 * @param {Object} offset expects keys row,col, offsets increment
                 * @param {Boolean} [isBefore] inserted before location
                 * @param {Boolean} [wasDeleted]
                 * @memberOf jS
                 */
                offsetFormulas:function (loc, offset, isBefore, wasDeleted) {
                    var size = jS.sheetSize(),
                    //effected range is the entire spreadsheet
                        affectedRange = {
                            first:{
                                row:1,
                                col:1
                            },
                            last:{
                                row:size.rows,
                                col:size.cols
                            }
                        },
                        last = new Date(),
                        cellStack = [];



                    jS.cycleCells(function () {
                        var cell = this;
                        if (this.formula && typeof this.formula == 'string' && jS.isFormulaEditable(this.td)) {
                            this.formula = jS.reparseFormula(this.formula, offset, loc, isBefore, wasDeleted);

                            this.td.data('formula', '=' + this.formula);
                        }

                        cellStack.push(function() {
                            jS.calcDependencies.call(cell, last, true);
                        });

                    }, affectedRange.first, affectedRange.last);

                    while (cellStack.length) {
                        cellStack.pop()();
                    }

                    jS.evt.cellEditDone();
                },

                /**
                 * Re-parses a formula
                 * @param formula
                 * @param {Object} offset expects keys row,col, offsets increment
                 * @param {Object} [loc]
                 * @param {Boolean} [isBefore]
                 * @param {Boolean} [wasDeleted]
                 * @returns {String}
                 * @memberOf jS
                 */
                reparseFormula:function (formula, offset, loc, isBefore, wasDeleted) {
                    return formula.replace(jSE.regEx.cell, function (ignored, col, row, pos) {
                        if (col == "SHEET") return ignored;
                        offset = offset || {loc: 0, row: 0};

                        var oldLoc = {
                                row:row * 1,
                                col:jSE.columnLabelIndex(col)
                            },
                            moveCol,
                            moveRow,
                            override = {
                                row: row,
                                col: col,
                                use: false
                            };

                        if (loc) {
                            if (wasDeleted) {
                                if (isBefore) {
                                    if (oldLoc.col && oldLoc.col == loc.col - 1) {
                                        override.col = '#REF!';
                                        override.use = true;
                                    }
                                    if (oldLoc.row && oldLoc.row == loc.row - 1) {
                                        override.row = '#REF!';
                                        override.use = true;
                                    }

                                    if (oldLoc.col >= loc.col) {
                                        moveCol = true;
                                    }
                                    if (oldLoc.row >= loc.row) {
                                        moveRow = true;
                                    }
                                } else {
                                    if (loc.col && oldLoc.col == loc.col) {
                                        override.col = '#REF!';
                                        override.use = true;
                                    }
                                    if (loc.row && oldLoc.row == loc.row) {
                                        override.row = '#REF!';
                                        override.use = true;
                                    }

                                    if (loc.col && oldLoc.col > loc.col) {
                                        moveCol = true;
                                    }
                                    if (loc.row && oldLoc.row > loc.row) {
                                        moveRow = true;
                                    }
                                }

                                if (override.use) {
                                    return override.col + override.row;
                                }

                                if (moveCol) {
                                    oldLoc.col += offset.col;
                                    return jS.makeFormula(oldLoc);
                                }

                                if (moveRow) {
                                    oldLoc.row += offset.row;
                                    return jS.makeFormula(oldLoc);
                                }
                            } else {
                                if (isBefore) {
                                    if (loc.col && oldLoc.col >= loc.col) {
                                        moveCol = true;
                                    }
                                    if (loc.row && oldLoc.row >= loc.row) {
                                        moveRow = true;
                                    }
                                } else {
                                    if (loc.col && oldLoc.col > loc.col) {
                                        moveCol = true;
                                    }
                                    if (loc.row && oldLoc.row > loc.row) {
                                        moveRow = true;
                                    }
                                }

                                if (moveCol) {
                                    oldLoc.col += offset.col;
                                    return jS.makeFormula(oldLoc);
                                }

                                if (moveRow) {
                                    oldLoc.row += offset.row;
                                    return jS.makeFormula(oldLoc);
                                }
                            }
                        } else {
                            return jS.makeFormula(oldLoc, offset);
                        }

                        return ignored;
                    });
                },


                /**
                 * Reconstructs a formula
                 * @param {Object} loc expects keys row,col
                 * @param {Object} [offset] expects keys row,col
                 * @returns {String}
                 * @memberOf jS
                 */
                makeFormula:function (loc, offset) {
                    offset = $.extend({row:0, col:0}, offset);

                    //set offsets
                    loc.col += offset.col;
                    loc.row += offset.row;

                    //0 based now
                    if (loc.col < 0) loc.col = 0;
                    if (loc.row < 0) loc.row = 0;

                    return jSE.parseCellName(loc.col, loc.row);
                },

                /**
                 * Cycles through a certain group of td objects in a spreadsheet table and applies a function to them
                 * @param {Function} fn the function to apply to a cell
                 * @param {Object} [firstLoc] expects keys row,col, the cell to start at
                 * @param {Object} [lastLoc] expects keys row,col, the cell to end at
                 * @param {Number} [i] spreadsheet index within instance
                 * @memberOf jS
                 */
                cycleCells:function (fn, firstLoc, lastLoc, i) {
                    i = i || jS.i;
                    firstLoc = firstLoc || {row:1, col:1};

                    if (!lastLoc) {
                        var size = jS.sheetSize();
                        lastLoc = {row:size.rows, col:size.cols};
                    }

                    var row = lastLoc.row, col;
                    if (row < firstLoc.row) return;
                    do {
                        col = lastLoc.col;
                        do {
                            fn.call(jS.spreadsheets[i][row][col], i, row, col);
                        } while (col-- > firstLoc.col);
                    } while (row-- > firstLoc.row);
                },

                /**
                 * Cycles through all td objects in a spreadsheet table and applies a function to them
                 * @param fn
                 * @memberOf jS
                 */
                cycleCellsAll:function (fn) {
                    var jSI = jS.i, i,size,endLoc;
                    for (i = 0; i <= jS.sheetCount; i++) {
                        jS.i = i;
                        size = jS.sheetSize();
                        endLoc = {row:size.rows, col:size.cols};
                        jS.cycleCells(fn, {row:0, col:0}, endLoc, i);
                    }
                    jS.i = jSI;
                },

                /**
                 * Cycles through a certain group of td objects in a spreadsheet table and applies a function to them, firstLoc can be bigger then lastLoc, this is more dynamic
                 * @param {Function} fn the function to apply to a cell
                 * @param {Object} firstLoc expects keys row,col, the cell to start at
                 * @param {Object} lastLoc expects keys row,col, the cell to end at
                 * @param {Boolean} [ordered] is what you are sending to this method already sorted?
                 * @param {Boolean} [increment] use increment rather than decrement, which is a bit slower
                 * @memberOf jS
                 */
                cycleCellArea:function (fn, firstLoc, lastLoc, ordered, increment) {
                    var grid = {start:{}, end: {}},
                        rowIndex,
                        colIndex,
                        row,
                        cell,
                        i = jS.i,
                        o = {cell: [], td: []},
                        sheet = jS.spreadsheets[i],
                        arrayMethod = (increment ? 'unshift' : 'push');

                    if (ordered) {
                        grid.start = firstLoc;
                        grid.end = lastLoc;
                    } else {
                        grid.start.row = math.max(math.min(firstLoc.row, lastLoc.row), 1);
                        grid.start.col = math.max(math.min(firstLoc.col, lastLoc.col), 1);
                        grid.end.row = math.max(firstLoc.row, lastLoc.row, 1);
                        grid.end.col = math.max(firstLoc.col, lastLoc.col, 1);
                    }

                    rowIndex = grid.end.row;

                    do {
                        colIndex = grid.end.col;
                        row = sheet[rowIndex] || null;
                        do {
                            if (row) {
                                cell = row[colIndex] || null;
                                if (cell) {
                                    o.cell[arrayMethod](cell);
                                    o.td[arrayMethod](cell.td[0]);
                                }
                            }
                        } while (colIndex-- > grid.start.col);
                    } while (rowIndex-- > grid.start.row);

                    if (fn) {
                        fn(o);
                    }
                },


                /**
                 * Adds tBody, colGroup, heights and widths to different parts of a spreadsheet
                 * @param {HTMLElement} table table object
                 * @memberOf jS
                 */
                formatTable:function (table) {
                    var w = s.newColumnWidth,
                        h = s.colMargin,
                        children = table.children,
                        i = children.length - 1,
                        j,
                        col,
                        tBody,
                        colGroup,
                        firstTr,
                        hasTBody,
                        hasColGroup;

                    if (i > -1) {
                        do {
                            switch (children[i].nodeName) {
                                case 'TBODY':
                                    hasTBody = true;
                                    tBody = children[i];
                                    break;
                                case 'COLGROUP':
                                    hasColGroup = true;
                                    colGroup = children[i];
                                    break;
                            }
                        } while (i--);
                    } else {
                        var child = document.createElement('tr');
                        //if there aren't any children, give it at least 1
                        child.appendChild(document.createElement('td'));
                        table.appendChild(child);
                        children = table.children;
                    }

                    if (!tBody) {
                        tBody = document.createElement('tbody');
                        do {
                            tBody.appendChild(children[0]);
                        } while (children.length);
                    }

                    if (!colGroup || colGroup.children.length < 1) {
                        colGroup = document.createElement('colgroup');

                        table.appendChild(colGroup);
                        table.appendChild(tBody);

                        firstTr = tBody.children[0];

                        for (i = 0, j = firstTr.children.length; i < j; i++) {
                            col = document.createElement('col');
                            colGroup.appendChild(col);
                            col.style.width = w + 'px';
                        }
                        for (i = 0, j = tBody.children.length; i < j; i++) {
                            tBody.children[i].style.height = h + 'px';
                        }
                    }

                    table.tBody = tBody;
                    table.colGroup = colGroup;
                    table.removeAttribute('width');
                    table.style.width = '';
                },

                /**
                 * Ensure sheet minimums have been met, if not add columns and rows
                 * @param {jQuery|HTMLElement} o table object
                 * @memberOf jS
                 */
                checkMinSize:function (o) {
                    var size = jS.sheetSize(o),
                        addRows = s.minSize.rows || 0,
                        addCols = s.minSize.cols || 0,
                        actionUI = jS.obj.pane().actionUI,
                        frozenAt = actionUI.frozenAt;

                    addRows = (frozenAt.row > addRows ? frozenAt.row + 1 : addRows);
                    addCols = (frozenAt.col > addCols ? frozenAt.col + 1 : addCols);

                    if (size.cols < addCols) {
                        jS.controlFactory.addColumnMulti(null, addCols - size.cols);
                    }

                    if (size.rows < addRows) {
                        jS.controlFactory.addRowMulti(null, addRows - size.rows);
                    }
                },

                /**
                 * jQuery ui Themeroller integration
                 * @memberOf jS
                 * @namespace
                 */
                themeRoller:{

                    /**
                     * Starts themeroller integration
                     * @param {jQuery|HTMLElement} sheet spreadsheet table
                     * @memberOf jS.themeRoller
                     */
                    start:function (sheet) {
                        jS.obj.header().addClass(jS.cl.uiControl);
                        jS.obj.label().addClass(jS.cl.uiControl);
                        jS.obj.formula().addClass(jS.cl.uiControlTextBox);
                    },

                    /**
                     * Themeroller cell interactions
                     * @memberOf jS.themeRoller
                     * @namespace
                     */
                    cell:{

                        /**
                         * Highlights object
                         * @param {jQuery|HTMLElement} [obj] td object
                         * @memberOf jS.themeRoller.cell
                         */
                        setHighlighted:function (obj) {
                            obj = obj || $([]);

                            var i,
                                oldObjects = jS.highlightedLast.obj,
                                actionUI = jS.obj.pane().actionUI;

                            //_obj is the old selected items
                            if (oldObjects && oldObjects.length > 0) {
                                i = oldObjects.length - 1;
                                do {
                                    oldObjects[i].isHighlighted = false;
                                } while (i-- > 0);
                            }

                            if (obj.length > 0) {
                                i = obj.length - 1;
                                do {
                                    if (!obj[i].isHighlighted) {
                                        obj[i].isHighlighted = true;
                                        if (!obj[i].className.match(jS.cl.uiTdHighlighted)) {
                                            obj[i].className += ' ' + jS.cl.uiTdHighlighted;
                                        }
                                    }
                                } while (i-- > 0);
                            }

                            jS.themeRoller.cell.clearHighlighted.call(obj, oldObjects);

                            //Chrome has a hard time rendering table col elements when they change style, this triggers the table to be re-rendered
                            actionUI.redraw();
                        },

                        /**
                         * Detects if there is a cell highlighted
                         * @returns {Boolean}
                         * @memberOf jS.themeRoller.cell
                         */
                        isHighlighted:function () {
                            return (jS.highlightedLast.obj.length ? true : false);
                        },

                        /**
                         * Clears highlighted cells
                         * @param {Object} [obj]
                         * @param {Boolean} [force]
                         * @memberOf jS.themeRoller.cell
                         */
                        clearHighlighted:function (obj, force) {
                            if (jS.themeRoller.cell.isHighlighted()) {
                                obj = obj || jS.highlightedLast.obj;

                                if (obj && obj.length) {
                                    var i = obj.length - 1;
                                    do {
                                        if (!obj[i].isHighlighted || force) {
                                            obj[i].className = obj[i].className.replace(jS.cl.uiTdHighlighted, '');
                                            obj[i].isHighlighted = false;
                                        }
                                    } while (i-- > 0);
                                }
                            }

                            if (this.length) {
                                jS.highlightedLast.obj = this;
                            } else {
                                jS.highlightedLast.obj = $([]);
                            }
                        }
                    },

                    /**
                     * Themeroller bar interactions
                     * @memberOf jS.themeRoller
                     * @namespace
                     */
                    bar:{

                        /**
                         * Adds initial style to bar
                         * @param {jQuery|HTMLElement} o bar object
                         * @memberOf jS.themeRoller.bar
                         */
                        style:function (o) {
                            $(o).addClass(jS.cl.uiBar);
                        },

                        /**
                         * Sets a bar to be active
                         * @param {String} direction left or top
                         * @param {HTMLElement} td index of bar
                         * @memberOf jS.themeRoller.bar
                         */
                        setActive:function (direction, td) {
                            switch (direction) {
                                case 'top':
                                    jS.highlightedLast.barTop
                                        .removeClass(jS.cl.uiBarHighlight);
                                    jS.highlightedLast.barTop = $(td).addClass(jS.cl.uiBarHighlight);
                                    break;
                                case 'left':
                                    jS.highlightedLast.barLeft
                                        .removeClass(jS.cl.uiBarHighlight);
                                    jS.highlightedLast.barLeft = $(td).addClass(jS.cl.uiBarHighlight);
                                    break;
                            }
                        },

                        /**
                         * Clears bars from being active
                         * @memberOf jS.themeRoller.bar
                         */
                        clearActive:function () {
                            jS.highlightedLast.barLeft
                                .removeClass(jS.cl.uiBarHighlight);
                            jS.highlightedLast.barLeft = $([]);

                            jS.highlightedLast.barTop
                                .removeClass(jS.cl.uiBarHighlight);
                            jS.highlightedLast.barTop = $([]);
                        }
                    },

                    /**
                     * Themeroller tab interactions
                     * @memberOf jS.themeRoller
                     * @namespace
                     */
                    tab:{

                        /**
                         * Sets a tab to be active
                         * @memberOf jS.themeRoller.tab
                         */
                        setActive:function () {
                            this.clearActive();
                            jS.obj.tab().addClass(jS.cl.uiTabActive);
                        },

                        /**
                         * Clears a tab from being active
                         * @memberOf jS.themeRoller.tab
                         */
                        clearActive:function () {
                            jS.obj.tabContainer().find('span.' + jS.cl.uiTabActive)
                                .removeClass(jS.cl.uiTabActive);
                        }
                    }
                },

                /**
                 * jQuery ui resizeable integration
                 * @param {jQuery|HTMLElement} o To set resizable
                 * @param {Object} settings the settings used with jQuery ui resizable
                 * @memberOf jS
                 */
                resizable:function (o, settings) {
                    if (!o.data('resizable')) {
                        o.resizable(settings);
                    }
                },

                /**
                 * instance busy state
                 * @memberOf jS
                 */
                busy:[],


                /**
                 * Set the spreadsheet busy status
                 * @param {Boolean} busy
                 * @memberOf jS
                 */
                setBusy:function (busy) {
                    if (busy) {
                        jS.busy.push(busy);
                    } else {
                        jS.busy.pop();
                    }
                },

                /**
                 * get the spreadsheet busy status
                 * @memberOf jS
                 * @returns {Boolean}
                 */
                isBusy:function () {
                    return (jS.busy.length > 0);
                },

                /**
                 * jQuery ui draggable integration
                 * @param {jQuery|HTMLElement} o To set resizable
                 * @param {Object} settings the settings used with jQuery ui resizable
                 * @memberOf jS
                 */
                draggable:function (o, settings) {
                    if (!o.data('jSdraggable')) {
                        o
                            .data('jSdraggable', true)
                            .draggable(settings);
                    }
                },

                /**
                 * jQuery nearest integration
                 * @param o
                 * @param settings
                 * @memberOf jS
                 */
                nearest:function (o, settings) {
                    return $(o).nearest(settings);
                },

                /**
                 * Bar resizing
                 * @memberOf jS
                 * @namespace
                 */
                resizeBar:{

                    /**
                     * Provides the top bar with ability to resize
                     * @param {jQuery|HTMLElement} $bar td bar object
                     * @param {Number} i index of bar
                     * @param {jQuery|HTMLElement} pane spreadsheet pane
                     * @param {jQuery|HTMLElement} sheet spreadsheet table
                     * @memberOf jS.resizeBar
                     */
                    top:function ($bar, i, pane, sheet) {
                        jS.obj.barTopControls().remove();
                        var barController = document.createElement('div'),
                            $barController = $(barController)
                                .addClass(jS.cl.barController + ' ui-state-highlight')
                                .width($bar.width())
                                .height(0)
                                .prependTo($bar),
                            col,
                            handle;

                        jS.controls.bar.x.controls[jS.i] = jS.obj.barTopControls().add($barController);

                        jS.resizableCells($barController, {
                            handles:'e',
                            start:function (e, ui) {
                                jS.autoFillerHide();
                                jS.setBusy(true);
                                col = jS.col(sheet, i);
                                if (pane.freezeHandleTop) {
                                    pane.freezeHandleTop.remove();
                                }
                                col.removeAttribute('width');
                            },
                            resize:function (e, ui) {
                                col.style.width = ui.size.width + 'px';

                                if (pane.inPlaceEdit) {
                                    pane.inPlaceEdit.goToTd();
                                }
                            },
                            stop:function (e, ui) {
                                jS.setBusy(false);
                                pane.resizeScroll();
                                jS.followMe();
                                jS.setDirty(true);
                            },
                            minWidth: 32
                        });

                        handle = barController.children[0];
                        handle.style.height = $bar.outerHeight() + 'px';
                        handle.style.position = 'absolute';
                    },

                    /**
                     * Provides the left bar with ability to resize
                     * @param {jQuery|HTMLElement} $bar td bar object
                     * @param {Number} i index of bar
                     * @param {jQuery|HTMLElement} pane spreadsheet pane
                     * @param {jQuery|HTMLElement} sheet spreadsheet table
                     * @memberOf jS.resizeBar
                     */
                    left:function ($bar, i, pane, sheet) {
                        jS.obj.barLeftControls().remove();
                        var offset = $bar.offset(),
                            barController = document.createElement('div'),
                            $barController = $(barController)
                                .addClass(jS.cl.barController + ' ui-state-highlight')
                                .prependTo($bar)
                                .offset({
                                    top:offset.top,
                                    left:offset.left
                                }),
                            bar = $bar[0],
                            td = $bar.next()[0],
                            parent = td.parentNode,
                            child = document.createElement('div'),
                            $child = $(child)
                                .addClass('jSBarControllerChild')
                                .height($bar.height())
                                .prependTo($barController),
                            handle;

                        jS.controls.bar.y.controls[jS.i] = jS.obj.barLeftControls().add($barController);

                        jS.resizableCells($child, {
                            handles:'s',
                            start:function () {
                                jS.autoFillerHide();
                                jS.setBusy(true);
                                if (pane.freezeHandleLeft) {
                                    pane.freezeHandleLeft.remove();
                                }
                                parent.removeAttribute('height');
                                bar.removeAttribute('height');
                                td.removeAttribute('height');
                            },
                            resize:function (e, ui) {
                                barController.style.height =
                                    td.style.height =
                                        bar.style.height =
                                            parent.style.height =
                                                ui.size.height + 'px';

                                if (pane.inPlaceEdit) {
                                    pane.inPlaceEdit.goToTd();
                                }
                            },
                            stop:function (e, ui) {
                                jS.setBusy(false);
                                pane.resizeScroll();
                                jS.followMe();
                                jS.setDirty(true);
                            },
                            minHeight: 15
                        });

                        handle = child.children[0];
                        handle.style.width = $bar.outerWidth() + 'px';
                        handle.style.position = 'absolute';
                    },

                    /**
                     * Provides the corner bar, just a place holder, needed for auto events
                     * @memberOf jS.resizeBar
                     */
                    corner:function () {
                    }
                },

                /**
                 * Removes sheet decorations
                 * @param {Boolean} makeClone creates a clone rather than the actual object
                 * @param {jQuery|HTMLElement} sheets spreadsheet table object to remove decorations from
                 * @returns {jQuery|HTMLElement}
                 * @memberOf jS
                 */
                sheetDecorateRemove:function (makeClone, sheets) {
                    sheets = sheets || jS.obj.tables();
                    sheets = (makeClone ? sheets.clone() : sheets);

                    //Get rid of highlighted cells and active cells
                    sheets.find('td.' + jS.cl.uiTdActive)
                        .removeClass(jS.cl.uiTdActive);

                    sheets.find('td.' + jS.cl.uiTdHighlighted)
                        .removeClass(jS.cl.uiTdHighlighted);
                    return sheets;
                },

                /**
                 * Updates the label so that the user knows where they are currently positioned
                 * @param {String|Object} v Value to update to, if object {col, row}
                 * @param {Boolean} [setDirect]
                 * @memberOf jS
                 */
                labelUpdate:function (v, setDirect) {
                    if (!setDirect) {
                        v = jSE.parseCellName(v.col, v.row);
                        if (v) jS.obj.label().text(v);
                    } else {
                        jS.obj.label().text(v);
                    }
                },

                /**
                 * Starts td to be edited
                 * @param {jQuery|HTMLElement} td
                 * @param {Boolean} [isDrag] should be determined by if the user is dragging their mouse around setting cells
                 * @param {Boolean} [doNotClearHighlighted]
                 */
                cellEdit:function (td, isDrag, doNotClearHighlighted) {
                    if (jS.cellLast.td.length < 1) {
                        //doNotClearHighlighted = false;
                    }

                    jS.autoFillerNotGroup = true; //make autoFiller directional again.
                    //This finished up the edit of the last cell
                    jS.evt.cellEditDone();

                    if (!td.length) return;

                    var loc = jS.getTdLocation(td),
                        cell = td[0].jSCell,
                        v;

                    if (!cell) return;
                    if (cell.uneditable) return;

                    jS.trigger('sheetCellEdit', [cell]);

                    if (!td.is(jS.cellLast.td)) {
                        jS.followMe(td);
                    } else {
                        jS.autoFillerGoToTd(td);
                    }

                    //Show where we are to the user
                    jS.labelUpdate(loc);

                    if (cell.formula) {
                        v = '=' + cell.formula;
                    } else {
                        v = cell.value;
                    }

                    var formula = jS.obj.formula()
                        .val(v)
                        .blur();

                    jS.cellSetActive(td, loc, isDrag, false, null, doNotClearHighlighted);
                },

                /**
                 * sets cell active to sheet, and highlights it for the user, shouldn't be called directly, should use cellEdit
                 * @param {jQuery|HTMLElement} td
                 * @param {Object} loc {col, row}
                 * @param {Boolean} [isDrag] should be determined by if the user is dragging their mouse around setting cells
                 * @param {Boolean} [directional] makes highlighting directional, only left/right or only up/down
                 * @param {Function} [fnDone] called after the cells are set active
                 * @param {Boolean} [doNotClearHighlighted]
                 * @memberOf jS
                 */
                cellSetActive:function (td, loc, isDrag, directional, fnDone, doNotClearHighlighted) {
                    loc = loc || jS.getTdLocation(td);
                    if (loc.col != u) {
                        jS.cellLast.td = td; //save the current cell/td

                        jS.cellLast.row = jS.rowLast = loc.row;
                        jS.cellLast.col = jS.colLast = loc.col;

                        if (!doNotClearHighlighted) {
                            jS.themeRoller.cell.setHighlighted(td); //themeroll the cell and bars
                            jS.highlightedLast.start = loc;
                            jS.highlightedLast.end = loc;
                        }

                        if (!td.length) return;

                        jS.themeRoller.bar.setActive('left', td[0].barLeft);
                        jS.themeRoller.bar.setActive('top', td[0].barTop);

                        var selectModel,
                            clearHighlightedModel;

                        switch (s.cellSelectModel) {
                            case 'excel':
                            case 'gdrive':
                                selectModel = function () {};
                                clearHighlightedModel = function() {};//jS.themeRoller.cell.clearHighlighted;
                                break;
                            case 'oo':
                                selectModel = function (target) {
                                    if (jS.isCell(target)) {
                                        jS.cellEdit($(target));
                                    }
                                };
                                clearHighlightedModel = function () {};
                                break;
                        }

                        if (isDrag) {
                            var locTrack = {},
                                pane = jS.obj.pane();

                            locTrack.last = loc;//we keep track of the most recent location because we don't want tons of recursion here

                            pane.onmousemove = function (e) {
                                e = e || window.event;

                                var target = e.target || e.srcElement;

                                if (jS.isBusy()) {
                                    return false;
                                }

                                var locEnd = jS.highlightedLast.end = jS.getTdLocation(target),
                                    ok = true;

                                //bar
                                if (
                                    locEnd.col < 1
                                        || locEnd.row < 1
                                        || locEnd.col == nAN
                                        || locEnd.row == nAN
                                    ) {
                                    return false;
                                }

                                if (directional) {
                                    ok = false;
                                    if (loc.col == locEnd.col || loc.row == locEnd.row) {
                                        ok = true;
                                    }
                                }

                                if ((locTrack.last.col != locEnd.col || locTrack.last.row != locEnd.row) && ok) { //this prevents this method from firing too much
                                    //select active cell if needed
                                    selectModel(target);

                                    //highlight the cells
                                    jS.cycleCellArea(function (o) {
                                        jS.themeRoller.cell.setHighlighted(o.td);
                                    }, loc, locEnd, false, true);
                                }
                                jS.followMe($(target));
                                var mouseY = e.clientY,
                                    mouseX = e.clientX,
                                    offset = pane.$enclosure.offset(),
                                    cellLoc = jS.getTdLocation(target),
                                    up = cellLoc.row,
                                    left = cellLoc.col,
                                    move = false,
                                    previous;

                                if (n(up) || n(left)) {
                                    return false;
                                }

                                if(mouseY > offset.top){
                                    move = true;
                                    up--
                                }
                                if(mouseX > offset.left){
                                    move = true;
                                    left--
                                }
                                if(move){
                                    if (up < 1 || left < 1) {
                                        return false;
                                    }
                                    previous = jS.spreadsheets[jS.i][up][left];
                                    jS.followMe($(previous.td), true);
                                }

                                locTrack.last = locEnd;
                                return true;
                            };

                            document.onmouseup = function() {
                                pane.onmousemove = null;
                                pane.onmousemove = null;
                                pane.onmouseup = null;
                                document.onmouseup = null;

                                if (fnDone) {
                                    fnDone();
                                }
                            };
                        }
                    }
                },

                /**
                 * the most recent used column
                 * @memberOf jS
                 */
                colLast:0,

                /**
                 * the most recent used row
                 * @memberOf jS
                 */
                rowLast:0,

                /**
                 * the most recent used cell, {td, row, col, isEdit}
                 * @memberOf jS
                 * @type {Object}
                 */
                cellLast:{
                    td:$([]), //this is a dud td, so that we don't get errors
                    row:0,
                    col:0,
                    isEdit:false
                },

                /**
                 * the most recent highlighted cells {td, rowStart, colStart, rowEnd, colEnd}
                 * @memberOf jS
                 * @type {Object}
                 */
                highlightedLast:{
                    obj:$([]),
                    start: {row: 0, col: 0},
                    end: {row: 0, col: 0},
                    barLeft: $([]),
                    barTop: $([])
                },

                /**
                 * the most recent highlighted cells {td, rowStart, colStart, rowEnd, colEnd}, in order
                 * @memberOf jS
                 * @type {Object}
                 */
                highlightedLastOrdered: function() {
                    var grid = this.highlightedLast,
                        _grid = {start:{}, end:{}};

                    _grid.start.row = Math.min(grid.start.row, grid.end.row);
                    _grid.start.col = Math.min(grid.start.col, grid.end.col);
                    _grid.end.row = Math.max(grid.start.row, grid.end.row);
                    _grid.end.col = Math.max(grid.start.col, grid.end.col);

                    return _grid;
                },

                /**
                 * sets cell(s) class for styling
                 * @param {String} setClass class(es) to set cells to
                 * @param {String} [removeClass] class(es) to remove from cell if the setClass would conflict with
                 * @param {Object} [tds]
                 * @returns {Boolean}
                 * @memberOf jS
                 */
                cellStyleToggle:function (setClass, removeClass, tds) {
                    tds = tds || jS.highlighted();
                    if (tds.length < 1) {
                        return false;
                    }
                    jS.setDirty(true);
                    //Lets check to remove any style classes
                    var td,
                        $td,
                        i = tds.length - 1,
                        cells = jS.obj.cellsEdited(),
                        cellsEdited = jS.controls.cellsEdited[jS.i],
                        hasClass;

                    //TODO: use calcDependencies and sheetPreCalculation to set undo redo data

                    if (i >= 0) {
                        hasClass = tds[0].className.match(setClass); //go by first element in set
                        do {
                            td = tds[i];
                            $td = $(td);

                            if (removeClass) {//If there is a class that conflicts with this one, we remove it first
                                $td.removeClass(removeClass);
                            }

                            //Now lets add some style
                            if (hasClass) {
                                $td.removeClass(setClass);
                            } else {
                                $td.addClass(setClass);
                            }

                            if (!td.jSCell.edited) {
                                td.jSCell.edited = true;
                                cellsEdited = cells.add(td.jSCell);
                            }

                        } while (i--);

                        return true;
                    }

                    return false;
                },

                /**
                 * sets cell(s) type
                 * @param {String} [type] cell type
                 * @param {Object} [cells]
                 * @returns {Boolean}
                 * @memberOf jS
                 */
                cellTypeToggle:function(type, cells) {
                    cells = cells || jS.highlighted(true);

                    if (cells.length < 1) {
                        return;
                    }

                    var i = cells.length - 1,
                        remove = cells[i].cellType == type;

                    if (i >= 0) {
                        do {
                            if (remove) {
                                cells[i].cellType = null;
                            } else {
                                cells[i].cellType = type;
                            }
                            cells[i].calcLast = 0;
                            jS.updateCellValue.call(cells[i]);
                        } while(i--);
                    }
                },

                /**
                 * Resize fonts in a cell by 1 pixel
                 * @param {String} direction "up" or "down"
                 * @param {Object} [tds]
                 * @memberOf jS
                 * @returns {Boolean}
                 */
                fontReSize:function (direction, tds) {
                    tds = tds || jS.highlighted();
                    if (tds.length < 1) {
                        return false;
                    }

                    var resize = 0;
                    switch (direction) {
                        case 'up':
                            resize = 1;
                            break;
                        case 'down':
                            resize = -1;
                            break;
                    }

                    //Lets check to remove any style classes
                    var td,
                        $td,
                        i = tds.length - 1,
                        size,
                        cells = jS.obj.cellsEdited(),
                        cellsEdited = jS.controls.cellsEdited[jS.i];

                    //TODO: use calcDependencies and sheetPreCalculation to set undo redo data

                    if (i >= 0) {
                        do {
                            td = tds[i];
                            $td = $(td);
                            size = ($td.css("font-size") + '').replace("px", "") * 1;
                            $td.css("font-size", ((size || 10) + resize) + "px");

                            if (!td.jSCell.edited) {
                                td.jSCell.edited = true;
                                cellsEdited = cells.add(td.jSCell);
                            }
                        } while(i--);
                        return true;
                    }
                    return false;
                },

                /**
                 * Current number of cells being parsed
                 * @type {Number}
                 * @memberOf jS
                 */
                callStack:0,

                /**
                 * Ignites calculation with cell, is recursively called if cell uses value from another cell, can be sent indexes, or be called via .apply(cell)
                 * @param {Number} [sheetIndex] sheet index within instance
                 * @param {Number} [rowIndex] row index
                 * @param {Number} [colIndex] col index
                 * @returns {*} cell value after calculated
                 * @memberOf jS
                 */
                updateCellValue:function (sheetIndex, rowIndex, colIndex) {
                    var sheet, row, cell, fn;

                    sheetIndex = sheetIndex || 0;
                    rowIndex = rowIndex || -1;
                    colIndex = colIndex || -1;

                    if (rowIndex > -1) {
                        //first detect if the cell exists if not return nothing
                        if (!(sheet = jS.spreadsheets[sheetIndex])) return s.error({error:jS.msg.notFoundSheet});
                        if (!(row = sheet[rowIndex])) return s.error({error:jS.msg.notFoundRow});
                        if (!(cell = row[colIndex])) return s.error({error:jS.msg.notFoundColumn});
                    } else {
                        cell = this;
                    }

                    if (cell === undefined) {
                        throw new Error("cell doesn't exist");
                    }

                    cell.oldValue = cell.value; //we detect the last value, so that we don't have to update all cell, thus saving resources

                    if (cell.result) { //unset the last result if it is set
                        delete cell.result;
                    }

                    switch (cell.state[cell.state.length - 1]) {
                        case 'updating':
                            return s.error({error:jS.msg.loopDetected});
                        case 'updatingDependencies':
                            return (cell.valueOverride != u ? cell.valueOverride : cell.value);
                    }

                    if (cell.defer) {//merging creates a defer property, which points the cell to another location to get the other value
                        return jS.updateCellValue.call(cell.defer);
                    }

                    cell.state.push('updating');
                    cell.fnCount = 0;
                    cell.result = null;

                    if (cell.calcLast != jS.calcLast || cell.calcDependenciesLast != jS.calcDependenciesLast) {
                        cell.valueOverride = null;
                        cell.calcLast = jS.calcLast;
                        cell.calcDependenciesLast = jS.calcDependenciesLast;
                        cell.needsUpdated = true;

                        cell.calcCount++;
                        if (cell.formula) {
                            try {
                                if (cell.formula.charAt(0) == '=') {
                                    cell.formula = cell.formula.substring(1);
                                }

                                var formulaParser;
                                if (jS.callStack) { //we prevent parsers from overwriting each other
                                    if (!cell.formulaParser) { //cut down on un-needed parser creation
                                        cell.formulaParser = window.Formula(jS.cellHandler);
                                    }
                                    formulaParser = cell.formulaParser
                                } else {//use the sheet's parser if there aren't many calls in the callStack
                                    formulaParser = jS.formulaParser;
                                }

                                jS.callStack++;
                                formulaParser.setObj(cell);
                                cell.result = formulaParser.parse(cell.formula);
                            } catch (e) {
                                cell.result = e.toString();
                            }
                            jS.callStack--;

                            if (cell.result && cell.cellType && s.cellTypeHandlers[cell.cellType]) {
                                cell.result = s.cellTypeHandlers[cell.cellType].call(cell, cell.result);
                            }
                            jS.filterValue.call(cell);
                        } else if (cell.value && cell.cellType && s.cellTypeHandlers[cell.cellType]) {
                            cell.result = s.cellTypeHandlers[cell.cellType].call(cell, cell.value);
                            jS.filterValue.call(cell);
                        } else {
                            if (cell.value != u && cell.value.charAt) {
                                fn = jS.s.cellStartingHandlers[cell.value.charAt(0)];
                                if (fn) {
                                    cell.valueOverride = fn.call(cell, cell.value);
                                } else {
                                    fn = jS.s.cellEndHandlers[cell.value.charAt(cell.value.length - 1)];
                                    if (fn) {
                                        cell.valueOverride = fn.call(cell, cell.value);
                                    }
                                }
                            }
                            jS.filterValue.call(cell);
                        }
                    }
                    cell.needsUpdated = false;
                    cell.state.pop();
                    return (cell.valueOverride != u ? cell.valueOverride : cell.value);
                },

                /**
                 * Ignites calculation with dependent cells is recursively called if cell uses value from another cell, also adds dependent cells to the dependencies attribute of cell
                 * @memberOf jS
                 */
                updateCellDependencies:function () {
                    if ((this.state || (this.state = [])).length) return;
                    this.state.push('updatingDependencies');
                    var dependencies = this.dependencies || []; //just in case it was never set
                    this.dependencies = [];
                    var i = dependencies.length - 1;

                    if (i > -1) {
                        do {
                            var dependantCell = dependencies[i],
                                dependantCellLoc = jS.getTdLocation(dependantCell.td);

                            dependantCell.calcDependenciesLast = 0;

                            jS.updateCellValue.call(dependantCell);
                            if (dependantCellLoc.row > 0 && dependantCellLoc.col > 0) {
                                jS.updateCellDependencies.call(dependantCell);
                            }
                        } while (i--);
                    }

                    this.state.pop();
                },

                /**
                 * Filters cell's value so correct entity is displayed, use apply on cell object
                 * @memberOf jS
                 */
                filterValue:function () {
                    var encodedValue, html;
                    if (this.result != u) {
                        this.value = this.result.valueOf();
                        html = this.result.html;
                    } else if (typeof this.value == 'string' && this.value.length > 0) {
                        encodedValue = s.encode(this.value);
                    }

                    this.td.html(html || encodedValue || this.value);
                },

                /**
                 * Object handler for formulaParser
                 * @memberOf jS
                 * @namespace
                 */
                cellHandler:{

                    /**
                     * Variable handler for formulaParser, arguments are the variable split by '.'.  Expose variables by using jQuery.sheet setting formulaVariables
                     * @returns {*}
                     * @memberOf jS.cellHandler
                     */
                    variable:function () {
                        if (arguments.length) {
                            var name = arguments[0],
                                attr = arguments[1],
                                formulaVariables = jS.s.formulaVariables,
                                formulaVariable,
                                result;

                            switch (name.toLowerCase()) {
                                case 'true':
                                    result = new Boolean(true);
                                    result.html = 'TRUE';
                                    return result;
                                case 'false':
                                    result = new Boolean(false);
                                    result.html = 'FALSE';
                                    return result;
                            }

                            if (formulaVariable = formulaVariables[name] && !attr) {
                                return formulaVariable;
                            } else if (formulaVariable && attr) {
                                return formulaVariable[attr];
                            } else {
                                return '';
                            }
                        }
                    },

                    /**
                     * time to fraction of day 1 / 0-24
                     * @param {String} time
                     * @param {Boolean} isAmPm
                     * @returns {*}
                     * @memberOf jS.cellHandler
                     */
                    time:function (time, isAmPm) {
                        return times.fromString(time, isAmPm);
                    },

                    /**
                     * get a number from variable
                     * @param {*} num
                     * @returns {Number}
                     * @memberOf jS.cellHandler
                     */
                    number:function (num) {
                        switch (typeof num) {
                            case 'number':
                                return num;
                            case 'string':
                                if (!n(num)) {
                                    return num * 1;
                                }
                            case 'object':
                                if (num.getMonth) {
                                    return dates.toCentury(num);
                                }
                        }
                        return num;
                    },

                    /**
                     * get a number from variable
                     * @param {*} _num
                     * @returns {Number}
                     * @memberOf jS.cellHandler
                     */
                    numberInverted: function(_num) {
                        var num = jS.cellHandler.number(_num),
                            inverted = new Number(num.valueOf() * -1);
                        if (num.html) {
                            inverted.html = num.html;
                        }
                        return inverted;
                    },

                    /**
                     * Perform math internally for parser
                     * @param {String} mathType
                     * @param {*} num1
                     * @param {*} num2
                     * @returns {*}
                     */
                    performMath: function (mathType, num1, num2) {
                        var type1,
                            type2,
                            type1IsNumber = true,
                            type2IsNumber = true,
                            errors = [],
                            value,
                            output = function(val) {return val;};

                        switch (type1 = (typeof num1.valueOf())) {
                            case 'number':break;
                            case 'string':
                                if (!n(num1)) {
                                    num1 *= 1;
                                } else {
                                    type1IsNumber = false;
                                }
                                break;
                            case 'object':
                                if (num1.getMonth) {
                                    num1 = dates.toCentury(num1);
                                    output = dates.get;
                                } else {
                                    type1IsNumber = false;
                                }
                                break;
                            default:
                                type1IsNumber = false;
                        }

                        switch (type2 = (typeof num2.valueOf())) {
                            case 'number':break;
                            case 'string':
                                if (!n(num2)) {
                                    num2 *= 1;
                                } else {
                                    type2IsNumber = false;
                                }
                                break;
                            case 'object':
                                if (num2.getMonth) {
                                    num2 = dates.toCentury(num2);
                                } else {
                                    type2IsNumber = false;
                                }
                                break;
                            default:
                                type2IsNumber = false;
                        }

                        if (!type1IsNumber) {
                            errors.push('not a number: ' + num1);
                            num1 = 0;
                        }

                        if (!type2IsNumber) {
                            errors.push('not a number: ' + num2);
                            num2 = 0;
                        }

                        if (errors.length) {
                            //throw new Error(errors.join(';') + ';');
                        }

                        switch (mathType) {
                            case '+':
                                value = num1 + num2;
                                break;
                            case '-':
                                value = num1 - num2;
                                break;
                            case '/':
                                value = num1 / num2;
                                if (value == Infinity || value == nAN) {
                                    value = 0;
                                }
                                break;
                            case '*':
                                value = num1 * num2;
                                break;
                            case '^':
                                value = math.pow(num1, num2);
                                break;
                        }

                        return output(value);
                    },

                    /**
                     * Get cell value
                     * @param {String} id example "A1"
                     * @returns {*}
                     * @memberOf jS.cellHandler
                     */
                    cellValue:function (id) { //Example: A1
                        var loc = jSE.parseLocation(id), cell;

                        cell = jS.cellHandler.createDependency.call(this, this.sheet, loc);

                        jS.updateCellValue.call(cell);
                        return (cell.valueOverride != u ? cell.valueOverride : cell.value);
                    },

                    /**
                     * Creates a relationship between 2 cells, where the formula originates and the cell that is required to supply a value to
                     * @param {Number} sheetIndex
                     * @param {Object} loc {row, col}
                     * @returns {Object}
                     */
                    createDependency:function (sheetIndex, loc) {
                        var sheet, row, cell;
                        if (!(sheet = jS.spreadsheets[sheetIndex])) return null;
                        if (!(row = sheet[loc.row])) return null;
                        if (!(cell = row[loc.col])) return null;

                        if (!cell.dependencies) cell.dependencies = [];

                        if ($.inArray(this, cell.dependencies) < 0) {
                            cell.dependencies.push(this);
                        }

                        return cell;
                    },

                    /**
                     * Get cell values as an array
                     * @param {String} start example "A1"
                     * @param {String} end example "B1"
                     * @returns {Array}
                     * @memberOf jS.cellHandler
                     */
                    cellRangeValue:function (start, end) {//Example: A1:B1
                        start = jSE.parseLocation(start);
                        end = jSE.parseLocation(end);
                        var result = [],
                            i = math.max(start.row, end.row),
                            iEnd = math.min(start.row, end.row),
                            j = math.max(start.col, end.col),
                            jStart = j,
                            jEnd = math.min(start.col, end.col),
                            cell;

                        if (i >= iEnd || j >= jEnd) {
                            do {
                                j = jStart;
                                do {
                                    cell = jS.spreadsheets[this.sheet][i][j];
                                    jS.cellHandler.createDependency.call(this, this.sheet, {row:i, col:j});
                                    result.unshift(jS.updateCellValue.call(cell));
                                } while(j-- > jEnd);
                            } while (i-- > iEnd);
                            return result;
                        }

                        return result;
                    },

                    /**
                     * Get cell value
                     * @param {String} id example "$A$1"
                     * @returns {*}
                     * @memberOf jS.cellHandler
                     */
                    fixedCellValue:function (id) {
                        id = id.replace(/\$/g, '');
                        return jS.cellHandler.cellValue.call(this, id);
                    },

                    /**
                     * Get cell values as an array
                     * @param {String} start example "$A$1"
                     * @param {String} end example "$B$1"
                     * @returns {Array}
                     * @memberOf jS.cellHandler
                     */
                    fixedCellRangeValue:function (start, end) {
                        start = start.replace(/\$/g, '');
                        end = end.replace(/\$/g, '');
                        return jS.cellHandler.cellRangeValue.call(this, start, end);
                    },

                    /**
                     * Get cell value from a different sheet within an instance
                     * @param {String} sheet example "SHEET1"
                     * @param {String} id example "A1"
                     * @returns {*}
                     * @memberOf jS.cellHandler
                     */
                    remoteCellValue:function (sheet, id) {//Example: SHEET1:A1
                        var loc = jSE.parseLocation(id),
                            sheetIndex = jSE.parseSheetLocation(sheet);

                        jS.cellHandler.createDependency.call(this, sheetIndex, loc);

                        return jS.updateCellValue(sheetIndex, loc.row, loc.col);
                    },

                    /**
                     * Get cell values as an array from a different sheet within an instance
                     * @param {String} sheet example "SHEET1"
                     * @param {String} start example "A1"
                     * @param {String} end example "B1"
                     * @returns {Array}
                     * @memberOf jS.cellHandler
                     */
                    remoteCellRangeValue:function (sheet, start, end) {//Example: SHEET1:A1:B2
                        sheet = jSE.parseSheetLocation(sheet);
                        start = jSE.parseLocation(start);
                        end = jSE.parseLocation(end);

                        var result = [];

                        for (var i = start.row; i <= end.row; i++) {
                            for (var j = start.col; j <= end.col; j++) {
                                result.push(jS.updateCellValue(sheet, i, j));
                            }
                        }

                        return [result];
                    },

                    /**
                     * Calls a function either from jQuery.sheet.engine or defined in jQuery sheet setting formulaFunctions.  When calling a function the cell being called from is "this".
                     * @param {String} fn function name (Will be converted to upper case)
                     * @param {Array} [args] arguments needing to be sent to function
                     * @returns {*}
                     * @memberOf jS.cellHandler
                     */
                    callFunction:function (fn, args) {
                        fn = fn.toUpperCase();
                        args = args || [];

                        if ($.sheet.fn[fn]) {
                            this.fnCount++;
                            var result = $.sheet.fn[fn].apply(this, args);
                            return result;
                        } else {
                            return s.error({error:"Function " + fn + " Not Found"});
                        }
                    }
                },

                /**
                 * Cell lookup handlers
                 * @memberOf jS
                 * @namespace
                 */
                cellLookupHandlers:{

                    /**
                     * @param {String} id example "$A$1"
                     * @returns {Array} [sheet, startCell, endCell]
                     * @memberOf jS.cellLookupHandlers
                     */
                    fixedCellValue:function (id) {
                        return [jS.sheet, jSE.parseLocation(id), jSE.parseLocation(id)];
                    },

                    /**
                     * @param {String} sheet example "SHEET1"
                     * @param {String} start example "$A$1"
                     * @param {String} end example "$B$1"
                     * @returns {Array} [sheet, startCell, endCell]
                     * @memberOf jS.cellLookupHandlers
                     */
                    fixedCellRangeValue:function (sheet, start, end) {
                        return [jSE.parseSheetLocation(sheet), jSE.parseLocation(start), jSE.parseLocation(end)];
                    },

                    /**
                     * doesn't do anything right now
                     * @param id
                     * @memberOf jS.cellLookupHandlers
                     */
                    cellValue:function (id) {

                    },

                    /**
                     * @param {String} sheet example "SHEET1"
                     * @param {String} start example "A1"
                     * @param {String} end example "B1"
                     * @returns {Array} [sheet, startCell, endCell]
                     * @memberOf jS.cellLookupHandlers
                     */
                    cellRangeValue:function (sheet, start, end) {
                        return [jS.sheet, jSE.parseLocation(start), jSE.parseLocation(end)];
                    },

                    /**
                     * @param {String} sheet example "SHEET1"
                     * @param {String} id example "A1"
                     * @returns {Array} [sheet, startCell, endCell]
                     * @memberOf jS.cellLookupHandlers
                     */
                    remoteCellValue:function (sheet, id) {
                        return [jS.sheet, jSE.parseLocation(id), jSE.parseLocation(id)];
                    },

                    /**
                     *
                     * @param {String} sheet example "SHEET1"
                     * @param {String} start example "A1"
                     * @param {String} end example "B1"
                     * @returns {Array} [sheet, startCell, endCell]
                     * @memberOf jS.cellLookupHandlers
                     */
                    remoteCellRangeValue:function (sheet, start, end) {
                        return [jSE.parseSheetLocation(sheet), jSE.parseLocation(start), jSE.parseLocation(end)];
                    },

                    /**
                     * @returns {*}
                     * @memberOf jS.cellLookupHandlers
                     */
                    callFunction:function () {
                        if (arguments[0] == "VLOOKUP" || arguments[0] == "HLOOKUP" && arguments[1]) {
                            if (arguments[1] && arguments[1][1]) {
                                return arguments[1][1];
                            }
                            return [];
                        }
                    }
                },

                /**
                 * Looks up cell using jS.cellLookupHandlers
                 * @returns {Array}
                 * @memberOf jS
                 */
                cellLookup:function () {
                    var formulaParser = Formula($.extend({}, jS.cellHandler, jS.cellLookupHandlers));
                    formulaParser.setObj(this);

                    var args = formulaParser.parse(this.formula),
                        lookupTable = [];

                    for (var row = args[1].row; row <= args[2].row; row++) {
                        for (var col = args[1].col; col <= args[2].col; col++) {
                            lookupTable.push(jS.getCell(row, col, args[0]));
                        }
                    }

                    return lookupTable;
                },

                /**
                 * Date of last calculation
                 * @memberOf jS
                 */
                calcLast:0,

                /**
                 * @memberOf jS
                 */
                calcDependenciesLast:0,

                /**
                 * Where jS.spreadsheets are calculated, and returned to their td counterpart
                 * @param {Number} [sheetIndex] table index
                 * @param {Boolean} [refreshCalculations]
                 * @memberOf jS
                 */
                calc:function (sheetIndex, refreshCalculations) {
                    sheetIndex = sheetIndex || jS.i;
                    if (
                        jS.readOnly[sheetIndex]
                            || jS.isChanged(sheetIndex) === false
                            && !refreshCalculations
                            || !jS.formulaParser
                        ) {
                        return false;
                    } //readonly is no calc at all

                    jS.calcLast = new Date();

                    var sheet = jS.spreadsheetToArray(null, sheetIndex);
                    jSE.calc(sheetIndex, sheet, jS.updateCellValue);
                    jS.trigger('sheetCalculation', [
                        {which:'spreadsheet', sheet:sheet, index:sheetIndex}
                    ]);
                    jS.setChanged(false);
                    return true;
                },

                calcVisiblePos: {
                    row: -1,
                    col: -1
                },
                calcVisibleInit: function(sheetIndex) {
                    sheetIndex = sheetIndex || jS.i;

                    jS.calcLast = jS.calcLast || new Date();

                    var spreadsheet = jS.spreadsheetToArray(null, sheetIndex) || [],
                        ignite = jS.updateCellValue,
                        min = Math.min,
                        initRows = s.initCalcRows,
                        initCols = s.initCalcCols,
                        rowIndex = min(spreadsheet.length - 1, initRows),
                        row,
                        colIndex,
                        pos = {row: -1, col: -1};


                    if (rowIndex > 0) {
                        pos.row = rowIndex;
                        do {
                            if (rowIndex > 0 && (row = spreadsheet[rowIndex]) !== undefined) {
                                pos.col = colIndex = min(row.length - 1, initCols);
                                if (colIndex > 0) {
                                    do {
                                        ignite.apply(row[colIndex]);
                                    } while (colIndex-- > 1);
                                }
                            }
                        } while(rowIndex-- > 1);
                    }

                    this.calcVisiblePos = pos;
                    jS.trigger('sheetCalculation', [
                        {which:'spreadsheet', sheet:spreadsheet, index:sheetIndex}
                    ]);
                    jS.setChanged(false);
                },
                calcVisibleRow: function(actionUI, sheetIndex) {
                    sheetIndex = sheetIndex || jS.i;

                    var spreadsheet = jS.spreadsheetToArray(null, sheetIndex) || [],
                        endScrolledArea = actionUI.scrolledArea.end,
                        ignite = jS.updateCellValue,
                        min = Math.min,
                        initRows = s.initCalcRows,
                        initCols = s.initCalcCols,
                        targetRow = endScrolledArea.row + initRows,
                        targetCol = endScrolledArea.col + initCols,
                        rowIndex = min(spreadsheet.length - 1, targetRow),
                        row,
                        colIndex,
                        oldPos = this.calcVisiblePos,
                        newPos = {row: rowIndex, col: oldPos.col};


                    if (rowIndex > 0) {
                        do {
                            if ((row = spreadsheet[rowIndex]) !== undefined) {
                                colIndex = min(row.length - 1, targetCol);
                                if (colIndex > 0) {
                                    do {
                                        ignite.apply(row[colIndex]);
                                    } while (colIndex-- > 1);
                                }
                            }
                        } while (rowIndex-- > oldPos.row);

                    }

                    this.calcVisiblePos = newPos;

                    jS.trigger('sheetCalculation', [
                        {which:'spreadsheet', sheet:spreadsheet, index:sheetIndex}
                    ]);
                    jS.setChanged(false);
                },
                calcVisibleCol: function(actionUI, sheetIndex) {
                    sheetIndex = sheetIndex || jS.i;

                    var spreadsheet = jS.spreadsheetToArray(null, sheetIndex) || [],
                        endScrolledArea = actionUI.scrolledArea.end,
                        ignite = jS.updateCellValue,
                        min = Math.min,
                        initRows = s.initCalcRows,
                        initCols = s.initCalcCols,
                        targetRow = endScrolledArea.row + initRows,
                        targetCol = endScrolledArea.col + initCols,
                        rowIndex = min(spreadsheet.length - 1, targetRow),
                        row,
                        colIndex,
                        cell,
                        oldPos = this.calcVisiblePos,
                        newPos = {row: oldPos.row, col: oldPos.col};


                    if (rowIndex > 0) {
                        do {
                            if (rowIndex > 0 && (row = spreadsheet[rowIndex]) !== undefined) {
                                colIndex = min(row.length - 1, targetCol);
                                if ((cell = row[colIndex]) !== undefined) {
                                    ignite.apply(cell);
                                }
                            }
                        } while(rowIndex-- > 1);
                    }

                    this.calcVisiblePos = newPos;

                    jS.trigger('sheetCalculation', [
                        {which:'spreadsheet', sheet:spreadsheet, index:sheetIndex}
                    ]);
                    jS.setChanged(false);
                },

                /**
                 * Calculates just the dependencies of a single cell, and their dependencies recursively
                 * @param {Date} last
                 * @param {Boolean} skipUndoable
                 * @memberOf jS
                 */
                calcDependencies:function (last, skipUndoable) {
                    last = last || new Date();
                    jS.calcDependenciesLast = last;

                    if (!skipUndoable) {
                        var cell = this;
                        jS.undo.createCells([this], function(cells) {
                            jS.trigger('sheetPreCalculation', [
                                {which:'cell', cell:cell}
                            ]);

                            jS.setDirty(true);
                            jS.setChanged(true);
                            jS.updateCellValue.call(cell);
                            jS.updateCellDependencies.call(cell);
                            jS.trigger('sheetCalculation', [
                                {which:'cell', cell: cell}
                            ]);

                            return cells;
                        });
                    } else {
                        jS.trigger('sheetPreCalculation', [
                            {which:'cell', cell:this}
                        ]);

                        jS.setDirty(true);
                        jS.setChanged(true);
                        jS.updateCellValue.call(this);
                        jS.updateCellDependencies.call(this);
                        jS.trigger('sheetCalculation', [
                            {which:'cell', cell: this}
                        ]);
                    }
                },

                /**
                 * adds a spreadsheet table
                 * @param {Object} [size]
                 * @memberOf jS
                 */
                addSheet:function (size) {
                    size = size || {rows: 25, cols: 10};
                    if (size) {
                        jS.evt.cellEditAbandon();
                        jS.setDirty(true);
                        jS.controlFactory.sheetUI(jS.obj.ui, $.sheet.makeTable(size), jS.sheetCount);

                        jS.setActiveSheet(jS.sheetCount);

                        jS.sheetCount++;

                        jS.sheetSyncSize();

                        jS.obj.pane().resizeScroll();

                        jS.trigger('sheetAdd', [jS.i]);
                    }
                },

                /**
                 * deletes a spreadsheet table
                 * @param {Number} [i] spreadsheet index within instance
                 * @memberOf jS
                 */
                deleteSheet:function (i) {
                    var oldI = i || jS.i,
                        enclosureArray =jS.controls.enclosures.toArray(),
                        tabIndex;

                    enclosureArray.splice(oldI,1)

                    jS.obj.barHelper().remove();

                    jS.obj.enclosure().remove();
                    //BUG Found:
                    //The enclosure will not be removed correctly while you delete the sheet.You may find all the enclosure will be hidden after you add a sheet and delete it.
                    //The reason is that "jS.controls.enclosures" is a jQuery selector object( "$([])" ) which can't not remove element like an array.All enclosure are reserved after sheet has been deleted.
                    //Here I remove the element by creating the selector object again.
                    jS.controls.enclosures = $(enclosureArray);
                    jS.obj.menus().remove();
                    jS.obj.tabContainer().children().eq(jS.i).remove();
                    jS.spreadsheets.splice(oldI, 1);
                    jS.controls.autoFiller.splice(oldI, 1);
                    jS.controls.bar.helper.splice(oldI, 1);
                    jS.controls.bar.corner.splice(oldI, 1);
                    jS.controls.bar.x.controls.splice(oldI, 1);
                    jS.controls.bar.x.handleFreeze.splice(oldI, 1);
                    jS.controls.bar.x.controls.splice(oldI, 1);
                    jS.controls.bar.x.menu.splice(oldI, 1);
                    if (jS.controls.bar.x.menuParent && jS.controls.bar.x.menuParent[oldI]) {
                        jS.controls.bar.x.menuParent.splice(oldI, 1);
                    }
                    jS.controls.bar.x.parent.splice(oldI, 1);
                    jS.controls.bar.x.td.splice(oldI, 1);
                    jS.controls.bar.y.controls.splice(oldI, 1);
                    jS.controls.bar.y.handleFreeze.splice(oldI, 1);
                    jS.controls.bar.y.controls.splice(oldI, 1);
                    jS.controls.bar.y.menu.splice(oldI, 1);
                    if (jS.controls.bar.y.menuParent && jS.controls.bar.y.menuParent[oldI]) {
                        jS.controls.bar.y.menuParent.splice(oldI, 1);
                    }
                    jS.controls.bar.y.parent.splice(oldI, 1);
                    jS.controls.bar.y.td.splice(oldI, 1);
                    jS.controls.barMenuLeft.splice(oldI, 1);
                    jS.controls.barMenuTop.splice(oldI, 1);
                    jS.controls.barLeft.splice(oldI, 1);
                    jS.controls.barTop.splice(oldI, 1);
                    jS.controls.barTopParent.splice(oldI, 1);
                    jS.controls.chart.splice(oldI, 1);
                    jS.controls.tdMenu.splice(oldI, 1);
                    jS.controls.enclosure.splice(oldI, 1);
                    jS.controls.fullScreen = null;
                    jS.controls.inPlaceEdit.splice(oldI, 1);
                    jS.controls.menus.splice(oldI, 1);
                    jS.controls.menuLeft.splice(oldI, 1);
                    jS.controls.menuRight.splice(oldI, 1);
                    jS.controls.pane.splice(oldI, 1);
                    jS.controls.tables.splice(oldI, 1);
                    jS.controls.table.splice(oldI, 1);
                    //BUGFIX - After removing of sheet, we need update the tab.i property - start from removed sheet's position.
                    for (tabIndex = oldI+1; tabIndex < jS.controls.tab.length; ++tabIndex) {
                        var tab = jS.controls.tab[tabIndex].get(0);
                        tab.i--;
                    }
                    jS.controls.tab.splice(oldI, 1);
                    jS.controls.toggleHide.x.splice(oldI, 1);
                    jS.controls.toggleHide.y.splice(oldI, 1);
                    jS.readOnly.splice(oldI, 1);
                    jS.i = 0;
                    jS.sheetCount--;
                    jS.sheetCount = math.max(jS.sheetCount, 0);

                    if (jS.sheetCount == 0) {
                        jS.addSheet();
                    }

                    jS.setActiveSheet(jS.i);
                    jS.setDirty(true);
                    jS.setChanged(true);

                    jS.trigger('sheetDelete', [oldI]);
                },

                /**
                 * removes the currently selected row
                 * @param {Number} row
                 * @param {Boolean} skipCalc
                 * @memberOf jS
                 */
                deleteRow:function (row, skipCalc) {
                    var i, start, end, qty, size = jS.sheetSize();

                    if (row) {
                        start = end = row;
                    } else {
                        start = math.min(jS.highlightedLast.start.row, jS.highlightedLast.end.row);
                        end = math.max(jS.highlightedLast.start.row, jS.highlightedLast.end.row);
                    }

                    qty = (end - start) + 1;

                    if (start < 1 || size.cols < 2 || qty >= size.rows) {
                        return;
                    }

                    i = end;

                    do {
                        //remove tr's first
                        jS.getTd(jS.i, i, 1).parent().remove();
                    } while (start < i--);

                    //now remove bar
                    jS.controls.bar.y.td[jS.i].splice(start, qty);

                    //now remove cells
                    jS.spreadsheets[jS.i].splice(start, qty);

                    jS.refreshRowLabels(start);

                    jS.setChanged(true);

                    jS.offsetFormulas({
                            row:start,
                            col:0
                        }, {
                            row:-qty,
                            col:0
                        },
                        false,
                        true
                    );

                    jS.setDirty(true);

                    jS.evt.cellEditAbandon();

                    jS.obj.pane().resizeScroll();

                    jS.trigger('sheetDeleteRow', i);
                },

                /**
                 * removes the columns associated with highlighted cells
                 * @param {Number} [i]
                 * @memberOf jS
                 */
                deleteColumn:function (i) {
                    var j, start, end, qty, size = jS.sheetSize();

                    if (i) {
                        start = end = i;
                    } else {
                        start = math.min(jS.highlightedLast.start.col, jS.highlightedLast.end.col);
                        end = math.max(jS.highlightedLast.start.col, jS.highlightedLast.end.col);
                    }

                    qty = (end - start) + 1;

                    if (
                        start < 1
                            || size.cols < 2
                            || qty >= size.cols
                        ) {
                        return;
                    }

                    j = end;

                    jS.obj.barHelper().remove();
                    do {
                        var table = jS.obj.table(),
                            col = jS.col(table[0], j),
                            bar = jS.obj.barTop(j).remove(),
                            tds = col.tds,
                            k = tds.length - 1;

                        //remove tds first
                        do {
                            $(tds[k]).remove();
                        } while (k--);

                        //now remove bar
                        jS.obj.barTop(j).remove();

                        //now remove col
                        $(col).remove();
                    } while (start < j--);

                    //remove column
                    jS.controls.bar.x.td[jS.i].splice(start, qty);

                    //remove cells
                    k = jS.spreadsheets[jS.i].length - qty;
                    do {
                        jS.spreadsheets[jS.i][k].splice(start, qty);
                    } while (k-- > 1);

                    //refresh labels
                    jS.refreshColumnLabels(start);

                    jS.setChanged(true);

                    jS.offsetFormulas({
                            row:0,
                            col:start
                        }, {
                            row:0,
                            col:-qty
                        },
                        false,
                        true
                    );

                    jS.setDirty(true);

                    jS.evt.cellEditAbandon();

                    jS.obj.pane().resizeScroll();

                    jS.trigger('sheetDeleteColumn', j);
                },

                /**
                 * manages a tabs inner value
                 * @param {Boolean} [get] makes return the current value of the tab
                 * @param {Function} [callback]
                 * @returns {String}
                 * @memberOf jS
                 */
                sheetTab:function (get, callback) {
                    var sheetTab = '';
                    if (get) {
                        sheetTab = jS.obj.table().attr('title') || jS.msg.sheetTitleDefault.replace(/[{]index[}]/gi, jS.i + 1);
                        if (callback) {
                            callback(sheetTab);
                        }
                        return sheetTab;
                    } else if (jS.isSheetEditable() && s.editableNames) { //ensure that the sheet is editable, then let them change the sheet's name
                        s.prompt(
                            jS.msg.newSheetTitle,
                            function(newTitle) {
                                if (!newTitle) { //The user didn't set the new tab name
                                    sheetTab = jS.obj.table().attr('title');
                                    newTitle = (sheetTab ? sheetTab : jS.msg.sheetTitleDefault.replace(/[{]index[}]/gi, jS.i + 1));
                                } else {
                                    jS.setDirty(true);
                                    jS.obj.table().attr('title', newTitle);
                                    jS.obj.tab().html(newTitle);

                                    sheetTab = newTitle;
                                }

                                if (callback) {
                                    callback($(document.createElement('div')).text(sheetTab).html());
                                }
                            },
                            jS.sheetTab(true)
                        );
                        return null;
                    }
                },

                /**
                 * detects if a td is not visible
                 * @param {jQuery|HTMLElement} $td
                 * @memberOf jS
                 * @returns {Boolean|Object}
                 */
                tdNotVisible:function($td) {
                    var pane = jS.obj.pane(),
                        td = $td[0],
                        visibleFold = {
                            top:0,
                            bottom:pane.clientHeight,
                            left:0,
                            right:pane.clientWidth
                        },

                        tdWidth = $td.width(),
                        tdHeight = $td.height(),
                        tdLocation = {
                            top:td.offsetTop,
                            bottom:td.offsetTop + tdHeight,
                            left:td.offsetLeft,
                            right:td.offsetLeft + tdWidth
                        },
                        $tdParent = $td.parent();

                    if (!td.col) {
                        return false;
                    }

                    var xHidden = $(td.barTop).is(':hidden'),
                        yHidden = $tdParent.is(':hidden'),
                        hidden = {
                            up:yHidden,
                            down:tdLocation.bottom > visibleFold.bottom && tdHeight <= pane.clientHeight,
                            left:xHidden,
                            right:tdLocation.right > visibleFold.right && tdWidth <= pane.clientWidth
                        };

                    if (hidden.up || hidden.down || hidden.left || hidden.right) {
                        return hidden;
                    }

                    return false;
                },

                /**
                 * scrolls the sheet to the selected cell
                 * @param {jQuery|HTMLElement} [$td] default is tdActive
                 * @param {boolean} [dontMoveAutoFiller] keeps autoFillerHandler in default position
                 * @memberOf jS
                 */
                followMe:function ($td, dontMoveAutoFiller) {
                    $td = $td || jS.obj.tdActive();
                    if (!$td.length) return;

                    var pane = jS.obj.pane(),
                        actionUI = pane.actionUI;

                    jS.setBusy(true);

                    actionUI.putTdInView($td[0]);

                    jS.setBusy(false);

                    if(!dontMoveAutoFiller){
                        jS.autoFillerGoToTd($td);
                    }
                },

                /**
                 * moves autoFiller to a selected cell if it is enabled in settings
                 * @param {jQuery|HTMLElement} [$td] default is tdActive
                 * @param {Number} [h] height of a td object
                 * @param {Number} [w] width of a td object
                 * @memberOf jS
                 */
                autoFillerGoToTd:function ($td, h, w) {
                    if (!s.autoFiller) return;

                    $td = $td || jS.obj.tdActive();
                    var td = $td[0];

                    if (td && td.type == 'cell') { //ensure that it is a usable cell
                        h = h || td.clientHeight;
                        w = w || td.clientWidth;
                        if (!td.offsetHeight || !td.offsetWidth || !td.clientHeight || !td.clientWidth) {
                            jS.autoFillerHide();
                            return;
                        }

                        var tdPos = $td.position();

                        jS.obj.autoFiller()
                            .show()
                            .css('top', ((tdPos.top + (h || $td.height()) - 3) + 'px'))
                            .css('left', ((tdPos.left + (w || $td.width()) - 3) + 'px'));
                    }
                },

                /**
                 * hides the auto filler if it is enabled in settings
                 * @memberOf jS
                 */
                autoFillerHide:function () {
                    if (!s.autoFiller) return;

                    jS.obj.autoFiller().hide();
                },

                /**
                 * sets active a spreadsheet inside of a sheet instance
                 * @param {Number} [i] a sheet integer desired to show, default 0
                 * @memberOf jS
                 */
                setActiveSheet:function (i) {
                    i = i || 0;

                    if (jS.cellLast.row > 0 || jS.cellLast.col > 0) {
                        jS.evt.cellEditDone();
                        jS.obj.formula().val('');
                    }

                    //the below use of _scrollLeft and _scrollTop are protected from IE, which makes those attributes go away after something is hidden, thus forgetting where you are scrolled to when you change sheets
                    //IE, stop flossin' me
                    var enclosures = jS.obj.enclosures(),
                        j = enclosures.length - 1,
                        enclosure;

                    jS.autoFillerHide();

                    if (j > 0) {
                        do {
                            if (i != j) {
                                enclosure = enclosures[j];
                                enclosure._scrollLeft = enclosure._scrollLeft || enclosure.scrollUI.scrollLeft;
                                enclosure._scrollTop = enclosure._scrollTop || enclosure.scrollUI.scrollTop;
                                enclosure.style.display = "none";
                            }
                        } while (j-- > 0);
                    }

                    jS.i = i;

                    enclosure = enclosures[i];

                    enclosure.style.display = "";

                    jS.themeRoller.tab.setActive();

                    jS.readOnly[i] = (enclosure.table.className || '').match(/\breadonly\b/i) != null;

                    enclosure.pane.resizeScroll(true);

                    enclosure.scrollUI.scrollLeft = enclosure._scrollLeft || enclosure.scrollUI.scrollLeft;
                    enclosure.scrollUI.scrollTop = enclosure._scrollTop || enclosure.scrollUI.scrollTop;
                    enclosure._scrollLeft = enclosure._scrollTop = null;
                    enclosure.scrollUI.onscroll();
                },

                /**
                 * opens a spreadsheet into the active sheet instance
                 * @param {jQuery|HTMLCollection} tables
                 * @memberOf jS
                 */
                openSheet:function (tables) {
                    var lastIndex = tables.length - 1,
                        stack = [],
                        open = function() {
                            jS.setBusy(true);
                            var header = jS.controlFactory.header(),
                                ui = jS.controlFactory.ui(),
                                sheetAdder = jS.controlFactory.sheetAdder(),
                                tabContainer = jS.controlFactory.tabContainer(),
                                i;

                            jS.sheetCount = tables.length - 1;

                            header.ui = ui;
                            header.tabContainer = tabContainer;

                            ui.header = header;
                            ui.sheetAdder = sheetAdder;
                            ui.tabContainer = tabContainer;

                            tabContainer.header = header;
                            tabContainer.ui = ui;

                            s.parent
                                .append(header)
                                .append(ui)
                                .append(sheetAdder)
                                .append(tabContainer);

                            for (i = 0; i < tables.length; i++) {
                                new Loader(jS, i, ui, tables[i]);
                            }
                        },
                        Loader = function(jS, i, ui, table) {
                            var me = this;
                            this.i = i;
                            this.ui = ui;
                            this.table = table;
                            this.isLast = (i == lastIndex);
                            this.jS = jS;

                            if ($.sheet.max) {
                                var size = jS.tableSize(table);
                                if (size.rows > $.sheet.max || size.cols > $.sheet.max) {
                                    jS.trigger('sheetMaxSize', [table, i]);
                                    s.confirm(
                                        jS.msg.maxSizeBrowserLimitationOnOpen,
                                        function() {me.load();}
                                    );
                                } else {
                                    this.load();
                                }
                            } else {
                                this.load();
                            }
                        };

                    Loader.prototype = {
                        load: function() {
                            jS.controlFactory.sheetUI(this.ui, this.table, this.i);
                            jS.sheetCount++;

                            stack.push(this.i);

                            jS.trigger('sheetOpened', [this.i]);

                            if (this.isLast) {
                                this.loaded();
                            }
                        },
                        loaded: function() {
                            var jS = this.jS,
                                ui = this.ui;

                            // resizable container div
                            jS.resizableSheet(s.parent, {
                                minWidth:s.parent.width() * 0.1,
                                minHeight:s.parent.height() * 0.1,
                                start:function () {
                                    jS.setBusy(true);
                                    jS.obj.enclosure().hide();
                                    ui.sheetAdder.hide();
                                    ui.tabContainer.hide();
                                },
                                stop:function () {
                                    jS.obj.enclosure().show();
                                    ui.sheetAdder.show();
                                    ui.tabContainer.show();
                                    jS.setBusy(false);
                                    jS.sheetSyncSize();
                                    jS.obj.pane().resizeScroll();
                                }
                            });

                            jS.sheetSyncSize();

                            jS.setActiveSheet(0);

                            jS.setDirty(false);
                            jS.setBusy(false);

                            while (stack.length) {
                                jS.calcVisibleInit(jS.i = stack.pop());
                            }

                            jS.trigger('sheetAllOpened');
                        }
                    };

                    if (jS.isDirty) {
                        s.confirm(
                            jS.msg.openSheet,
                            open
                        );
                    } else {
                        open();
                    }
                },

                /**
                 * creates a new sheet from size from prompt
                 * @memberOf jS
                 */
                newSheet:function () {
                    s.parent
                        .html($.sheet.makeTable())
                        .sheet(s);
                },


                /**
                 * synchronizes the called parent's controls so that the controls fit correctly within the parent
                 * @function sheetSyncSize
                 * @memberOf jS
                 */
                sheetSyncSize:function () {
                    var h = s.parent[0].clientHeight;
                    if (!h) {
                        h = 400; //Height really needs to be set by the parent
                        s.parent.height(h);
                    } else if (h < 200) {
                        h = 200;
                        s.parent.height(h);
                    }

                    h -= jS.obj.header().outerHeight();
                    h -= jS.obj.tabContainer().outerHeight() + jS.s.boxModelCorrection;

                    var w = s.parent[0].clientWidth,
                        uiStyle = jS.obj.ui.style,
                        paneHeight = (h - window.scrollBarSize.height - s.boxModelCorrection) + 'px',
                        paneWidth = (w - window.scrollBarSize.width) + 'px',
                        standardHeight = h + 'px',
                        standardWidth = w + 'px';

                    jS.obj.panes().each(function() {
                        var style = this.style,
                            scrollStyle = this.actionUI.scrollUI.style,
                            enclosureStyle = this.enclosure.style;

                        style.height = paneHeight;
                        style.width = paneWidth;

                        enclosureStyle.height = scrollStyle.height = standardHeight;
                        enclosureStyle.width = scrollStyle.width = standardWidth;
                    });


                    uiStyle.height = standardHeight;
                    uiStyle.width = standardWidth;
                },

                /**
                 * changes a cell's style and makes it undoable/redoable
                 * @param style
                 * @param value
                 * @param cells
                 */
                cellChangeStyle:function (style, value, cells) {
                    cells = cells || jS.highlighted(true);
                    if (cells.length < 1) {
                        return false;
                    }

                    jS.setDirty(this);
                    var i = cells.length - 1;

                    if ( i >= 0) {
                        jS.undo.createCells(cells, function(cells) { //save state, make it undoable
                            do {
                                cells[i].td.css(style, value);
                            } while(i--);

                            return cells;
                        });
                        return true;
                    }

                    return false;
                },

                /**
                 * Finds a cell in a sheet from a value
                 * @param {String} [v] value to look for within a cell, if not supplied, a prompt is given
                 * @memberOf jS
                 */
                cellFind:function (v) {
                    function find (v) {
                        var trs = jS.obj.table()
                            .children('tbody')
                            .children('tr');

                        if (v) {//We just do a simple uppercase/lowercase search.
                            var o = trs.children('td:contains("' + v + '")');

                            if (o.length < 1) {
                                o = trs.children('td:contains("' + v.toLowerCase() + '")');
                            }

                            if (o.length < 1) {
                                o = trs.children('td:contains("' + v.toUpperCase() + '")');
                            }

                            o = o.eq(0);
                            if (o.length > 0) {
                                jS.cellEdit(o);
                            } else {
                                s.alert(jS.msg.cellNoFind);
                            }                           }
                    }
                    if (!v) {
                        s.prompt(
                            jS.msg.cellFind,
                            find
                        );
                    } else {
                        find(v);
                    }

                },

                /**
                 * Sets active bar
                 * @param {String} type "col" || "row" || "all"
                 * @param {Number} begin start highlighting from
                 * @param {Number} end end highlighting to
                 * @memberOf jS
                 */
                cellSetActiveBar:function (type, begin, end) {
                    var size = jS.sheetSize(),
                        first = math.min(begin, end),
                        last = math.max(begin, end),
                        start = {},
                        stop = {},

                        /**
                         * Sets active bar
                         * @param {Boolean} [before]
                         */
                            SetActive = function (before) {
                            switch (s.cellSelectModel) {
                                case 'oo': //follow cursor behavior
                                    this.row = (before ? start.row : stop.row);
                                    this.col = (before ? start.col : stop.col);
                                    this.td = jS.getTd(jS.i, this.row, this.col);
                                    if (!this.td.is(jS.cellLast.td)) {
                                        jS.cellEdit(this.td, false, true);
                                    }
                                    break;
                                default: //stay at initial cell
                                    this.row = (before ? stop.row : start.row);
                                    this.col = (before ? stop.col : start.col);
                                    this.td = jS.getTd(jS.i, this.row, this.col);
                                    if (!this.td.is(jS.cellLast.td[0])) {
                                        jS.cellEdit(this.td, false, true);
                                    }
                                    break;
                            }
                        },
                        obj = [],
                        scrolledArea  = jS.obj.pane().actionUI.scrolledArea,
                        sheet = jS.obj.table(),
                        col,
                        row;

                    switch (type) {
                        case 'top':
                            start.row = scrolledArea.end.row;
                            start.col = first;
                            stop.row = scrolledArea.end.row;
                            stop.col = last;

                            jS.highlightedLast.start.row = 1;
                            jS.highlightedLast.start.col = first;
                            jS.highlightedLast.end.row = size.rows;
                            jS.highlightedLast.end.col = last;

                            col = last;

                            do {
                                obj.push(jS.col(sheet[0], col));
                            } while(col-- > first);
                            break;
                        case 'left':
                            start.row = first;
                            start.col = scrolledArea.end.col;
                            stop.row = last;
                            stop.col = scrolledArea.end.col;

                            jS.highlightedLast.start.row = first;
                            jS.highlightedLast.start.col = 1;
                            jS.highlightedLast.end.row = last;
                            jS.highlightedLast.end.col = size.cols;

                            row = last;

                            do {
                                obj.push(jS.getTd(jS.i, row, 1)[0].parentNode);
                            } while(row-- > first);
                            break;
                        case 'corner': //all
                            start.row = 1;
                            start.col = 1;
                            stop.col = size.cols;
                            stop.row = size.rows;

                            obj.push(sheet[0]);
                            break;
                    }

                    new SetActive(begin > end);

                    jS.themeRoller.cell.setHighlighted($(obj));
                },

                /**
                 * gets a range of selected cells, then returns it
                 * @param {Object} [e] jQuery event, when in use, is during mouse down
                 * @param {String} v Value to preserve and return
                 * @param {String} [newFn]
                 * @param {Boolean} [notSetFormula]
                 * @returns {String}
                 * @memberOf jS
                 */
                getTdRange:function (e, v, newFn, notSetFormula) {
                    jS.cellLast.isEdit = true;

                    var range = function (loc) {
                            if (loc.first.col > loc.last.col ||
                                loc.first.row > loc.last.row
                                ) {
                                return {
                                    first:jSE.parseCellName(loc.last.col, loc.last.row),
                                    last:jSE.parseCellName(loc.first.col, loc.first.row)
                                };
                            } else {
                                return {
                                    first:jSE.parseCellName(loc.first.col, loc.first.row),
                                    last:jSE.parseCellName(loc.last.col, loc.last.row)
                                };
                            }
                        },
                        label = function (loc) {
                            var rangeLabel = range(loc),
                                v2 = v + '';
                            v2 = (v2.match(/=/) ? v2 : '=' + v2); //make sure we can use this value as a formula

                            if (newFn || v2.charAt(v2.length - 1) != '(') { //if a function is being sent, make sure it can be called by wrapping it in ()
                                v2 = v2 + (newFn ? newFn : '') + '(';
                            }

                            var formula,
                                lastChar = '';
                            if (rangeLabel.first != rangeLabel.last) {
                                formula = rangeLabel.first + ':' + rangeLabel.last;
                            } else {
                                formula = rangeLabel.first;
                            }

                            if (v2.charAt(v2.length - 1) == '(') {
                                lastChar = ')';
                            }

                            return v2 + formula + lastChar;
                        },
                        newVal = '',
                        loc,
                        sheet,
                        cells;

                    if (e) { //if from an event, we use mousemove method
                        loc = {
                            first:jS.getTdLocation([e.target])
                        };

                        sheet = jS.obj.table().mousemove(function (e) {
                            loc.last = jS.getTdLocation([e.target]);

                            newVal = label(loc);

                            if (!notSetFormula) {
                                jS.obj.formula().val(newVal);
                                jS.obj.inPlaceEdit().val(newVal);
                            }
                        });

                        $document.one('mouseup', function () {
                            sheet.unbind('mousemove');
                            return newVal;
                        });
                    } else {
                        cells = jS.highlighted().not(jS.obj.tdActive());

                        if (cells.length) {
                            loc = { //tr/td column and row index
                                first:jS.getTdLocation(cells.first()),
                                last:jS.getTdLocation(cells.last())
                            };

                            newVal = label(loc);

                            if (!notSetFormula) {
                                jS.obj.formula().val(newVal);
                                jS.obj.inPlaceEdit().val(newVal);
                            }

                            return newVal;
                        } else {
                            return '';
                        }
                    }
                    return '';
                },

                /**
                 * Gets the td element within a spreadsheet instance
                 * @param {Number} tableIndex table index
                 * @param {Number} rowIndex row index
                 * @param {Number} colIndex column index
                 * @returns {jQuery|HTMLElement}
                 * @memberOf jS
                 */
                getTd:function (tableIndex, rowIndex, colIndex) {
                    var table = jS.obj.tables()[tableIndex],
                        tBody,
                        row,
                        td;

                    if (
                        !table
                            || !(tBody = table.tBody)
                            || !(row = tBody.children[rowIndex])
                            || !(td = row.children[colIndex])
                        ) {
                        td = document.createElement('td');
                    }

                    return $(td);
                },

                /**
                 * Gets the td row and column index as an object {row, col}
                 * @param {Object} td
                 * @returns {Object}
                 * @memberOf jS
                 */
                getTdLocation:function (td) {
                    var result = {col:0, row:0};
                    td = td || '';
                    if (!td && !td[0]) return result;

                    td = td[0] || td;

                    if (td.parentNode == u || td.parentNode.rowIndex < 0) {
                        return result;
                    }

                    return {
                        col:parseInt(td.cellIndex),
                        row:parseInt(td.parentNode.rowIndex)
                    };
                },

                /**
                 * Get the bar index from an Element
                 * @memberOf jS
                 * @namespace
                 */
                getBarIndex:{

                    /**
                     * get index from bar left element
                     * @param [td] if null, will return -1
                     * @returns {Number}
                     * @memberOf jS.getBarIndex
                     */
                    left:function (td) {
                        td = td || {};
                        if (!td.parentNode || n(td.parentNode.rowIndex)) {
                            return -1;
                        } else {
                            return td.parentNode.rowIndex;
                        }
                    },

                    /**
                     * get index from bar top element
                     * @param [td] if null, will return -1
                     * @returns {Number} cellIndex
                     * @memberOf hS.getBarIndex
                     */
                    top:function (td) {
                        td = td || {};
                        if (n(td.cellIndex)) {
                            return -1;
                        } else {
                            return td.cellIndex;
                        }
                    },
                    corner:function () {
                        return 0;
                    }
                },

                /**
                 * Time manager for measuring execution speed
                 * @namespace
                 * @memberOf jS
                 */
                time:{
                    now:new Date(),
                    last:new Date(),
                    diff:function () {
                        return math.abs(math.ceil(this.last.getTime() - this.now.getTime()) / 1000).toFixed(5);
                    },
                    set:function () {
                        this.last = this.now;
                        this.now = new Date();
                    },
                    get:function () {
                        return this.now.getHours() + ':' + this.now.getMinutes() + ':' + this.now.getSeconds();
                    }
                },

                /**
                 * Changed tracker per sheet
                 * @memberOf jS
                 */
                changed:[],

                /**
                 * Changed = needs to be calculated
                 * @memberOf jS
                 * @param tableIndex
                 */
                isChanged:function (tableIndex) {
                    return jS.changed[tableIndex || jS.i];
                },

                /**
                 * Sets changed
                 * @param {Boolean} changed changed state
                 * @memberOf jS
                 */
                setChanged:function (changed) {
                    jS.changed[jS.i] = changed;
                },

                /**
                 * Dirty = changed needs saved
                 * @memberOf jS
                 */
                isDirty:false,

                /**
                 * Dirty manager
                 * @param dirty
                 * @memberOf jS
                 */
                setDirty:function (dirty) {
                    jS.dirty = dirty;
                },

                /**
                 * @param v
                 * @memberOf jS
                 */
                appendToFormula:function (v) {
                    var formula = jS.obj.formula(),
                        fV = formula.val();

                    if (fV.charAt(0) != '=') {
                        fV = '=' + fV;
                    }

                    formula.val(fV + v);
                },

                /**
                 * undo manager integration
                 * @memberOf jS
                 * @namespace
                 */
                undo:{
                    manager:(
                        window.UndoManager
                            ? new UndoManager()
                            : {
                            undo: emptyFN,
                            redo: emptyFN,
                            register: emptyFN,
                            notLoaded: true
                        }
                        ),
                    cells:[],
                    id:0,
                    createCells: function(cells, fn, id) {
                        if (jS.undo.manager.notLoaded) {
                            this.createCells = function(cells, fn, id) {
                                return fn(cells);
                            };
                            return this.createCells(cells, fn, id);
                        }
                        if (id == u) {
                            jS.undo.id++;
                            id = jS.undo.id;
                        }

                        var before = new jSCellRange(cells).clone().cells,
                            after = (fn ? new jSCellRange(fn(cells)).clone().cells : before);

                        before.id = id;
                        after.id = id;

                        jS.undo.manager.register(u, jS.undo.removeCells, [before, id], 'Remove Cells', u, jS.undo.createCells, [after, null, id], 'Create Cells');

                        if (id != jS.undo.id || !fn) {
                            jS.calcLast = new Date();
                            jS.undo.draw(after);
                        }

                        return true;
                    },
                    removeCells: function(cells, id) {
                        var i = 0, index = -1;
                        if (cells.id === id) {
                            index = i;
                        }

                        if (index !== -1) {
                            //jS.undo.cells.splice(index, 1);
                        }
                        jS.undo.draw(cells);
                    },
                    draw: function(clones) {
                        var i;
                        for (i = 0; i < clones.length; i++) {
                            var clone = clones[i],
                                loc = jS.getTdLocation(clone.td),
                                cell = jS.spreadsheets[clone.sheet][loc.row][loc.col];

                            cell.value = clone.value;
                            cell.formula = clone.formula;
                            cell.td = clone.td;
                            cell.dependencies = clone.dependencies;
                            cell.needsUpdated = clone.needsUpdated;
                            cell.calcCount = clone.calcCount;
                            cell.sheet = clone.sheet;
                            cell.calcLast = clone.calcLast;
                            cell.html = clone.html;
                            cell.state = clone.state;
                            cell.jS = clone.jS;
                            cell.calcDependenciesLast = clone.calcDependenciesLast;
                            cell.td.attr('style', clone.style);
                            cell.td.attr('class', clone.cl);

                            jS.updateCellValue.call(cell);
                        }
                    }
                },

                /**
                 * get cols associated with a sheet/table within an instance
                 * @param {jQuery|HTMLElement} [table]
                 * @returns {HTMLCollection|Array}
                 * @memberOf jS
                 */
                cols:function (table) {
                    table = table || jS.obj.table()[0];

                    //table / colGroup / col
                    if (!table) return [];
                    if (!table.colGroup) return [];
                    if (!table.colGroup.children) return [];

                    return table.colGroup.children
                },

                /**
                 * clone tables associated with sheet, and return them free of decorations and enclosure/pane etc.
                 * @param {jQuery|HTMLElement} [tables]
                 * @param {Boolean} [useActualTables]
                 * @returns {jQuery|Element}
                 * @memberOf jS
                 */
                tables:function (tables, useActualTables) {
                    tables = tables || jS.obj.tables();
                    var clonedTables = [],
                        i = tables.length - 1,
                        j,
                        table,
                        tBody,
                        colGroup,
                        colLeft,
                        tdLeft,
                        trTop,
                        trs,
                        tr;

                    do {
                        table = (useActualTables ? document.body.removeChild(tables[i]) : tables[i].cloneNode(true));

                        if (
                            (colGroup = table.children[0])
                                && (colLeft = colGroup.children[0])
                            ) {
                            colGroup.removeChild(colLeft);
                        }

                        if (tBody = table.children[1]) {
                            trs = tBody.children;
                            trTop = trs[0];
                            tBody.removeChild(trTop);
                            j = trs.length - 1;
                            do {
                                tr = trs[j];
                                tdLeft = tr.children[0];
                                tr.removeChild(tdLeft);
                            } while ( j-- > 0 ); //1 because trTop still exists in the array
                        }
                        clonedTables[i] = table;
                    } while (i-- > 0);

                    return jS.sheetDecorateRemove(false, $(clonedTables));
                },

                /**
                 * get col associated with a sheet/table within an instance
                 * @param {jQuery|HTMLElement} table
                 * @param {Number} [i] Index of column, default is last
                 * @returns {Element}
                 * @memberOf jS
                 */
                col:function (table, i) {
                    table = table || jS.obj.table()[0];

                    var cols = jS.cols(table);

                    if (i === u) {
                        i = cols.length - 1;
                    }

                    return cols[i];
                },

                /**
                 * get cells of a table row
                 * @param {HTMLElement} [table]
                 * @param {Number} [i] Index of row, default is last
                 * @returns {HTMLCollection|Array}
                 * @memberOf jS
                 */
                rowTds:function (table, i) {
                    table = table || jS.obj.table();

                    var rows = jS.rows(table);

                    if (!rows.length) {
                        return [];
                    }

                    if (i == u) {
                        i = rows.length - 1;
                    }


                    if (!rows[i]) return []; //tr
                    if (!rows[i].children) return []; //td

                    return rows[i].children;
                },

                /**
                 * Get rows of a sheet/table
                 * @param {HTMLElement} table
                 * @returns {HTMLCollection|Array}
                 * @memberOf jS
                 */
                rows:function (table) {
                    table = table || jS.obj.table()[0];
                    if (!table) return []; //table
                    if (!table.tBody) return []; //tBody
                    if (!table.tBody.children) return []; //tr

                    return table.tBody.children;
                },

                /**
                 * Get all the td objects that are currently highlighted
                 * @param {Boolean} [cells] will return cell objects rather than HTMLElement
                 * @returns {jQuery|HTMLElement|Array}
                 */
                highlighted:function(cells) {
                    var highlighted = jS.highlightedLast.obj || $([]),
                        obj = [],
                        tag,
                        i;

                    if (!(tag = highlighted) || !highlighted.length || !(tag = tag[0]) || !tag.tagName) {
                        return cells ? obj : $(obj);
                    }

                    switch (tag.tagName) {
                        case 'TD':
                            i = highlighted.length - 1;
                            do {
                                obj.unshift(cells ? highlighted[i].jSCell : highlighted[i]);
                            } while (i-- > 0);
                            break;
                        case 'TR':
                            i = highlighted.length - 1;
                            do {
                                if (highlighted[i].tds) {
                                    obj = obj.concat(cells ? highlighted[i].jSCells : highlighted[i].tds);
                                }
                            } while(i-- > 0);
                            break;
                        case 'COL':
                            highlighted = highlighted.filter('col');
                            i = highlighted.length - 1;
                            do {
                                if (highlighted[i].tds) {
                                    obj = obj.concat(cells ? highlighted[i].jSCells : highlighted[i].tds);
                                }
                            } while(i-- > 0);
                            break;
                        case 'TABLE':
                            obj = (cells ? tag.jSCells : tag.tds);
                            break;
                    }

                    return cells ? obj : $(obj);
                },

                /**
                 *
                 * @param {jQuery|HTMLElement} [table]
                 * @returns {Object} {cols, rows}
                 * @memberOf jS
                 */
                sheetSize:function (table) {
                    table = table || jS.obj.table()[0];
                    //table / tBody / tr / td

                    var lastRow = jS.rowTds(table),
                        loc = jS.getTdLocation(lastRow[lastRow.length - 1]);
                    return {
                        cols:loc.col,
                        rows:loc.row
                    };
                },

                test: function() {
                    var s = jS.highlighted(true);
//                        console.log(s);
                    console.log(jS.obj.enclosure())
                },

                sortVerticalSelectAscending:function() {
                    if (confirm('Do you want to extend your selection?')) {
                        jS.sortVertical(); return true;
                    } else {
                        jS.sortVerticalSingle(false); return true
                    }
                },

                sortVerticalSelectDescending:function() {
                    if (confirm('Do you want to extend your selection?')) {
                        jS.sortVertical(); return false;
                    } else {
                        jS.sortVerticalSingle(true); return false
                    }
                },


                /**
                 * Sorts what is highlighted vertically, and updates accordingly
                 * @param {Boolean} [reversed]
                 * @memberOf jS
                 */
                sortVertical:function (reversed) {

                    var selected = jS.highlighted(true),
                        trSibling = selected[0].td.parent().prev(),
                        length = selected.length,
                        date = new Date(),
                        isNum = true,
                        vals = [],
                        row = [],
                        offset,
                        i = 0,
                        cell,
                        val,
                        td;

                    while(i<length){
                        cell = selected[i];
                        td = cell.td[0];
                        if(!isNaN(cell.value)){
                            val = (new Number(cell.value.valueOf()));
                        }
                        else{
                            isNum = false;
                            val = (new String(cell.value.valueOf()));
                        }
                        val.loc = jS.getTdLocation(td);
                        val.row = td.parentNode;
                        val.col = td;
                        val.cell = cell;
                        vals.push(val);
                        i++;
                    }


                    if(reversed){
                        if(isNum == false){
                            vals.sort(function(a,b){return b-a});
                        }
                        else{
                            vals.sort();
                            vals.reverse();
                        }
                    }

                    else
                    {
                        if(isNum == true){
                            vals.sort(function(a,b){return a-b});
                        }
                        else{
                            vals.sort();
                        }
                    }

                    jS.undo.createCells(selected);
                    while(offset = vals.length)                            {
                        val = vals.pop();
                        row = jS.spreadsheets[jS.i].splice(val.row.rowIndex, 1);
                        cell = val.cell;
                        cell.value = val.valueOf();
                        cell.calcLast = 0;
                        val.row.parentNode.removeChild(val.row);
                        trSibling.after(val.row);
                        val.row.children[0].innerHTML = trSibling[0].rowIndex + offset;
                        jS.spreadsheets[jS.i].splice(trSibling[0].rowIndex + 1, 0, row[0]);
                        jS.calcDependencies.call(cell, date, true);
                    }

                    jS.undo.createCells(selected);
                },

                /**
                 * Sorts a single column
                 * @param reversed
                 */
                sortVerticalSingle: function (reversed) {
                    var selected = jS.highlighted(true),
                        length = selected.length,
                        i =  0,
                        num = [],
                        cell;

                    while(i<length){
                        num.push(selected[i].value);
                        i++
                    }
                    if(reversed){
                        num.sort(function(a,b){return b-a});
                    }
                    else{
                        num.sort(function(a,b){return a-b});
                    }
                    while(selected.length){
                        cell = selected.pop();
                        cell.value = num[selected.length];
                        cell.calcLast = 0;
                        jS.updateCellValue.call(cell);
                        jS.updateCellDependencies.call(cell);
                    }
                },

                sortHorizontalSelectAscending:function() {
                    if (confirm('Do you want to extend your selection?')) {
                        jS.sortHorizontal(); return true;
                    } else {
                        jS.sortHorizontalSingle(false); return true;
                    }
                },

                sortHorizontalSelectDescending:function() {
                    if (confirm('Do you want to extend your selection?')) {
                        jS.sortHorizontal(); return false;
                    } else {
                        jS.sortHorizontalSingle(true); return false;
                    }
                },

                /**
                 * Sorts what is highlighted horizontally, and updates accordingly
                 * @param {Boolean} [reversed]
                 * @memberOf jS
                 */
                sortHorizontal:function (reversed) {

                    var selected = jS.highlighted(true),
                        tdSibling = selected[0].td[0],
                        tdSiblingIndex = tdSibling.cellIndex,
                        colGroup = tdSibling.table.colGroup,
                        size = jS.sheetSize().rows,
                        length = selected.length,
                        date = new Date(),
                        isNum = true,
                        vals = [],
                        offset,
                        i = 0,
                        x,
                        cell,
                        val,
                        tr,
                        td;

                    while(i<length){
                        x = 0;
                        cell = selected[i];
                        td = cell.td[0];
                        if(!isNaN(cell.value)){
                            val = new Number(cell.value.valueOf());
                        }
                        else{
                            isNum = false;
                            val = new String(cell.value.valueOf());
                        }
                        val.tds = [];
                        val.loc = jS.getTdLocation(td);
                        val.tr = td.parentNode;
                        val.td = td;
                        val.cell = cell;
                        while(x <= size){
                            val.tds.push(jS.obj.pane().table.children[1].children[x].children[td.cellIndex]);
                            x++;
                        }
                        vals.push(val);
                        i++;

                    }


                    if(reversed){
                        if(isNum == false){
                            vals.sort(function(a,b){return b-a});
                        }
                        else{
                            vals.sort();
                            vals.reverse();
                        }
                    }

                    else
                    {
                        if(isNum == true){
                            vals.sort(function(a,b){return a-b});
                        }
                        else{
                            vals.sort();
                        }
                    }

                    jS.undo.createCells(selected);
                    while(vals.length){
                        val = vals.pop();
                        while(val.tds.length > 1){
                            td = val.tds.pop();
                            tr = td.parentNode;
                            cell = jS.spreadsheets[jS.i][tr.rowIndex].splice(td.cellIndex, 1);
                            tr.insertBefore(td, tr.children[tdSiblingIndex]);
                            td.col = colGroup.children[vals.length + td.cellIndex - 1];
                            td.barTop = td.col.bar;
                            cell.value = td.jSCell.value;
                            cell.calcLast = date;
                            jS.spreadsheets[jS.i][tr.rowIndex].splice(td.cellIndex, 0, cell[0]);
                            jS.calcDependencies.call(cell, date, true);
                        }
                    }
                    jS.undo.createCells(selected);
                },

                /**
                 * Sorts a single row
                 * @param reversed
                 */
                sortHorizontalSingle: function (reversed) {
                    var selected = jS.highlighted(true),
                        length = selected.length,
                        i =  0,
                        num = [],
                        cell;

                    while(i<length){
                        num.push(selected[i].value);
                        i++
                    }
                    if(reversed){
                        num.sort(function(a,b){return b-a});
                    }
                    else{
                        num.sort(function(a,b){return a-b});
                    }
                    while(selected.length){
                        cell = selected.pop();
                        cell.value = num[selected.length];
                        cell.calcLast = 0;
                        jS.updateCellValue.call(cell);
                        jS.updateCellDependencies.call(cell);
                    }
                },

                /**
                 *
                 * @param {jQuery|HTMLElement} [table]
                 * @returns {Object} {cols, rows}
                 * @memberOf jS
                 */
                tableSize:function (table) {
                    table = table || jS.obj.table()[0];
                    //table / tBody / tr / td

                    var trs = (table.children[0].nodeName != "TBODY" ? table.children[1] : table.children[0]).children,
                        tds = trs[trs.length - 1].children,
                        td = tds[tds.length - 1],
                        loc = jS.getTdLocation(td);

                    return {
                        cols:loc.col,
                        rows:loc.row
                    };
                },

                /**
                 * Toggles from editable to viewable and back
                 * @param replacementTables
                 * @memberOf jS
                 */
                toggleState:function (replacementTables) {
                    if (s.allowToggleState) {
                        var tables = replacementTables || jS.tables();
                        if (s.editable) {
                            jS.evt.cellEditAbandon();
                            jS.trigger('sheetSave', [tables]);
                        }
                        jS.setDirty(false);
                        jS.setChanged(true);
                        s.editable = !s.editable;

                        jS.kill();


                        s.parent
                            .html(tables)
                            .sheet(s);
                        s = null;
                    }
                },

                /**
                 * Turns a cell into a formula variable so it can be accessed by a name
                 * @param ref
                 * @memberOf jS
                 */
                setCellRef:function (ref) {
                    function setRef(ref) {
                        if (ref) { //TODO: need to update value when cell is updated
                            jS.s.formulaVariables[ref] = jS.updateCellValue(jS.i, loc.row, loc.col);
                        }
                    }

                    var td = jS.obj.tdActive(),
                        loc = jS.getTdLocation(td);

                    if (ref) {
                        setRef(ref);
                    } else {
                        s.prompt(
                            jS.msg.setCellRef,
                            setRef
                        );
                    }
                },

                /**
                 * @memberOf jS
                 */
                formulaParser: null
            };
        jS.setBusy(true);
        s.parent[0].jS = jS;

        //got tired of ie crashing when console not available
        if (!window.console) window.console = {log:function () {}};

        if (!window.scrollBarSize) {
            window.scrollBarSize = $.sheet.getScrollBarSize();
        }

        //ready the sheet's parser;
        if (window.Formula) {
            jS.formulaParser = window.Formula(jS.cellHandler);
        }

        //We need to take the sheet out of the parent in order to get an accurate reading of it's height and width
        //$(this).html(s.loading);
        s.origHtml = s.parent.children().detach();

        s.parent.addClass(jS.cl.parent);

        s.parent
            .bind('sheetSwitch', function (e, js, i) {
                jS.switchSheet(i);
            })
            .bind('sheetRename', function (e, js, i) {
                jS.renameSheet(i);
            });

        //Use the setting height/width if they are there, otherwise use parent's
        s.width = (s.width ? s.width : s.parent.width());
        s.height = (s.height ? s.height : s.parent.height());


        // Drop functions if they are not needed & save time in recursion
        if (!$.nearest) {
            jS.nearest = emptyFN;
        }

        jS.resizableCells = jS.resizableSheet = jS.resizable;
        if (!$.ui) {
            jS.resizable = jS.resizableCells = jS.resizableSheet = jS.draggable = emptyFN;
        } else {
            if (!s.resizableCells) jS.resizableCells = emptyFN;
            if (!s.resizableSheet) jS.resizableSheet = emptyFN;
        }

        if (!$.support.boxModel) {
            s.boxModelCorrection = 0;
        }

        if (!s.barMenus) {
            jS.controlFactory.barMenuTop = jS.controlFactory.barMenuLeft = emptyFN;
        }

        if (!s.freezableCells) {
            jS.controlFactory.barHandleFreeze.top = jS.controlFactory.barHandleFreeze.left = emptyFN;
        }

        if (s.calcOff) {
            jS.calc = emptyFN;
        }

        if (!window.Raphael) {
            jSE.chart = emptyFN;
        }

        $window
            .resize(function () {
                if (jS && !jS.isBusy()) { //We check because jS might have been killed
                    s.width = s.parent.width();
                    s.height = s.parent.height();
                    jS.sheetSyncSize();
                }
            });


        if ($.sheet.fn) { //If the new calculations engine is alive, fill it too, we will remove above when no longer needed.
            //Extend the calculation engine plugins
            $.sheet.fn = $.extend($.sheet.fn, s.formulaFunctions);

            //Extend the calculation engine with advanced functions
            if ($.sheet.advancedfn) {
                $.sheet.fn = $.extend($.sheet.fn, $.sheet.advancedfn);
            }

            //Extend the calculation engine with finance functions
            if ($.sheet.financefn) {
                $.sheet.fn = $.extend($.sheet.fn, $.sheet.financefn);
            }
        }

        s.title = s.title || s.parent.attr('title') || '';

        jS.s = s;

        s.parent.addClass(jS.cl.uiParent);

        if (s.origHtml.length) {
            jS.openSheet(s.origHtml);
        } else {
            jS.openSheet($(document.createElement('table')));
        }

        jS.setBusy(false);

        return jS;
    },

    /**
     * Creates an HTMLElement from a size given
     * @memberOf jQuery.sheet
     * @param {Object} [size] expects keys rows,cols,
     * @param {Number} [columnWidth] column width as number
     * @param {Number} [rowHeight] row height as number
     * @returns {HTMLElement}
     */
    makeTable:function (size, columnWidth, rowHeight) {
        var doc = document;
        //set defaults;
        size = size || {rows:25, cols:10};
        columnWidth = columnWidth || 120;
        rowHeight = rowHeight || 15;

        //Create elements before loop to make it faster.
        var table = document.createElement('table'),
            colGroup = document.createElement('colgroup'),
            tBody = document.createElement('tbody'),
            colStyle = 'width:' + columnWidth + 'px;',
            rowStyle = 'height:' + rowHeight + 'px;',
            tr,
            col,
            i,
            j;

        i = size.cols;

        do {
            col = document.createElement('col');
            col.setAttribute('style', colStyle);
            colGroup.appendChild(col);
        } while (i-- > 1);

        i = size.rows;
        do {
            tr = document.createElement('tr');
            tr.setAttribute('style', rowStyle);

            j = size.cols;
            do {
                tr.appendChild(document.createElement('td'));
            } while (j-- > 1);

            tBody.appendChild(tr);
        } while (i-- > 1);

        table.appendChild(colGroup);
        table.appendChild(tBody);

        return table;

    },

    /**
     * Destroy all spreadsheets loaded
     * @memberOf jQuery.sheet
     */
    killAll:function () {
        if ($.sheet) {
            var instance = $.sheet.instance;
            if (instance) {
                for (var i = 0; i< instance.length; i++) {
                    if (instance[i] && instance[i].kill) {
                        instance[i].kill();
                    }
                }
                $.sheet.instance = [];
            }
        }
    },

    /**
     * Make 2 or more spreadsheets scroll to together, useful for history viewing or spreadsheet comparison
     * @param {Number} I instance index
     * @memberOf jQuery.sheet
     */
    scrollLocker:function (I) {
        var instance = $.sheet.instance;
        instance[I].obj.panes().each(function (i) {
            var me;
            $(me = this.scrollUI).scroll(function (e) {
                var j = instance.length - 1,
                    scrollUI;
                if (j > -1) {
                    do {
                        scrollUI = instance[j].controls.enclosure[i][0].scrollUI;

                        if (this !== scrollUI) {
                            scrollUI.scrollLeft = me.scrollLeft;
                            scrollUI.scrollTop = me.scrollTop;
                        }
                    } while (j--);
                }
            });
        });
    },

    /**
     * Make 2 or more spreadsheets switch together, just like clicking their tabs at the same time
     * @param {Number} I instance index
     * @memberOf jQuery.sheet
     */
    switchSheetLocker:function (I) {
        $.each($.sheet.instance, function () {
            this.s.parent.bind('sheetSwitch', function (e, jS, i) {
                $.each($.sheet.instance, function () {
                    this.setActiveSheet(i);
                });
            });
        });
    },

    /**
     * Get current instance count
     * @returns {Number}
     * @memberOf jQuery.sheet
     */
    I:function () {
        var I = 0;
        if (this.instance) {
            I = (this.instance.length === 0 ? 0 : this.instance.length - 1); //we use length here because we havent yet created sheet, it will append 1 to this number thus making this the effective instance number
        } else {
            this.instance = [];
        }
        return I;
    },

    /**
     * Get scrollBar size
     * @returns {Object} {height: int, width: int}
     * @memberOf jQuery.sheet
     */
    getScrollBarSize:function () {
        var doc = document,
            inner = $(document.createElement('p')).css({
                width:'100%',
                height:'100%'
            }),
            outer = $(document.createElement('div')).css({
                position:'absolute',
                width:'100px',
                height:'100px',
                top:'0',
                left:'0',
                visibility:'hidden',
                overflow:'hidden'
            }).append(inner);

        $(document.body).append(outer);

        var w1 = inner.width(),
            h1 = inner.height();

        outer.css('overflow', 'scroll');

        var w2 = inner.width(),
            h2 = inner.height();

        if (w1 == w2 && outer[0].clientWidth) {
            w2 = outer[0].clientWidth;
        }
        if (h1 == h2 && outer[0].clientHeight) {
            h2 = outer[0].clientHeight;
        }

        outer.detach();

        var w = w1 - w2, h = h1 - h2;

        return {
            width: w || 15,
            height: h || 15
        };
    },

    debugPositionBox:function (x, y, box, color, which) {
        color = color || '#' + Math.floor(Math.random() * 16777215).toString(16);
        if (box) {
            var $box = $([]);
            $box = $box.add(this.debugPositionBox(box.left, box.top, null, color, 'top-left'));
            $box = $box.add(this.debugPositionBox(box.right, box.top, null, color, 'top-right'));
            $box = $box.add(this.debugPositionBox(box.left, box.bottom, null, color, 'bottom-left'));
            $box = $box.add(this.debugPositionBox(box.right, box.bottom, null, color, 'bottom-right'));
            return $box;
        }
        return $('<div style="width: 10px; height: 10px; position: absolute;"></div>')
            .css('top', (y - 5) + 'px')
            .css('left', (x + 5) + 'px')
            .css('background-color', color)
            .click(function () {
                console.log(which || 'none');
            })
            .appendTo('body');
    }
};