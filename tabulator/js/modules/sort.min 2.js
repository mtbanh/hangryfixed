/* Tabulator v4.7.1 (c) Oliver Folkerd */
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Sort=function(t){this.table=t,this.sortList=[],this.changed=!1};Sort.prototype.initializeColumn=function(t,e){var r,o,n=this,i=!1;switch(_typeof(t.definition.sorter)){case"string":n.sorters[t.definition.sorter]?i=n.sorters[t.definition.sorter]:console.warn("Sort Error - No such sorter found: ",t.definition.sorter);break;case"function":i=t.definition.sorter}t.modules.sort={sorter:i,dir:"none",params:t.definition.sorterParams||{},startingDir:t.definition.headerSortStartingDir||"asc",tristate:void 0!==t.definition.headerSortTristate?t.definition.headerSortTristate:this.table.options.headerSortTristate},(void 0===t.definition.headerSort?!1!==this.table.options.headerSort:!1!==t.definition.headerSort)&&(r=t.getElement(),r.classList.add("tabulator-sortable"),o=document.createElement("div"),o.classList.add("tabulator-arrow"),e.appendChild(o),r.addEventListener("click",function(e){var r="",o=[],i=!1;if(t.modules.sort){if(t.modules.sort.tristate)r="none"==t.modules.sort.dir?t.modules.sort.startingDir:t.modules.sort.dir==t.modules.sort.startingDir?"asc"==t.modules.sort.dir?"desc":"asc":"none";else switch(t.modules.sort.dir){case"asc":r="desc";break;case"desc":r="asc";break;default:r=t.modules.sort.startingDir}n.table.options.columnHeaderSortMulti&&(e.shiftKey||e.ctrlKey)?(o=n.getSort(),i=o.findIndex(function(e){return e.field===t.getField()}),i>-1?(o[i].dir=r,i!=o.length-1&&(i=o.splice(i,1)[0],"none"!=r&&o.push(i))):"none"!=r&&o.push({column:t,dir:r}),n.setSort(o)):"none"==r?n.clear():n.setSort(t,r),n.table.rowManager.sorterRefresh(!n.sortList.length)}}))},Sort.prototype.hasChanged=function(){var t=this.changed;return this.changed=!1,t},Sort.prototype.getSort=function(){var t=this,e=[];return t.sortList.forEach(function(t){t.column&&e.push({column:t.column.getComponent(),field:t.column.getField(),dir:t.dir})}),e},Sort.prototype.setSort=function(t,e){var r=this,o=[];Array.isArray(t)||(t=[{column:t,dir:e}]),t.forEach(function(t){var e;e=r.table.columnManager.findColumn(t.column),e?(t.column=e,o.push(t),r.changed=!0):console.warn("Sort Warning - Sort field does not exist and is being ignored: ",t.column)}),r.sortList=o,this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.sort&&this.table.modules.persistence.save("sort")},Sort.prototype.clear=function(){this.setSort([])},Sort.prototype.findSorter=function(t){var e,r=this.table.rowManager.activeRows[0],o="string";if(r&&(r=r.getData(),t.getField()))switch(e=t.getFieldValue(r),void 0===e?"undefined":_typeof(e)){case"undefined":o="string";break;case"boolean":o="boolean";break;default:isNaN(e)||""===e?e.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)&&(o="alphanum"):o="number"}return this.sorters[o]},Sort.prototype.sort=function(t){var e=this,r=this.table.options.sortOrderReverse?e.sortList.slice().reverse():e.sortList,o=[],n=[];e.table.options.dataSorting&&e.table.options.dataSorting.call(e.table,e.getSort()),e.clearColumnHeaders(),e.table.options.ajaxSorting?r.forEach(function(t,r){e.setColumnHeader(t.column,t.dir)}):(r.forEach(function(t,r){var n=t.column.modules.sort;t.column&&n&&(n.sorter||(n.sorter=e.findSorter(t.column)),t.params="function"==typeof n.params?n.params(t.column.getComponent(),t.dir):n.params,o.push(t)),e.setColumnHeader(t.column,t.dir)}),o.length&&e._sortItems(t,o)),e.table.options.dataSorted&&(t.forEach(function(t){n.push(t.getComponent())}),e.table.options.dataSorted.call(e.table,e.getSort(),n))},Sort.prototype.clearColumnHeaders=function(){this.table.columnManager.getRealColumns().forEach(function(t){t.modules.sort&&(t.modules.sort.dir="none",t.getElement().setAttribute("aria-sort","none"))})},Sort.prototype.setColumnHeader=function(t,e){t.modules.sort.dir=e,t.getElement().setAttribute("aria-sort",e)},Sort.prototype._sortItems=function(t,e){var r=this,o=e.length-1;t.sort(function(t,n){for(var i,s=o;s>=0;s--){var a=e[s];if(0!==(i=r._sortRow(t,n,a.column,a.dir,a.params)))break}return i})},Sort.prototype._sortRow=function(t,e,r,o,n){var i,s,a="asc"==o?t:e,l="asc"==o?e:t;return t=r.getFieldValue(a.getData()),e=r.getFieldValue(l.getData()),t=void 0!==t?t:"",e=void 0!==e?e:"",i=a.getComponent(),s=l.getComponent(),r.modules.sort.sorter.call(this,t,e,i,s,r.getComponent(),o,n)},Sort.prototype.sorters={number:function(t,e,r,o,n,i,s){var a=s.alignEmptyValues,l=s.decimalSeparator||".",u=s.thousandSeparator||",",c=0;if(t=parseFloat(String(t).split(u).join("").split(l).join(".")),e=parseFloat(String(e).split(u).join("").split(l).join(".")),isNaN(t))c=isNaN(e)?0:-1;else{if(!isNaN(e))return t-e;c=1}return("top"===a&&"desc"===i||"bottom"===a&&"asc"===i)&&(c*=-1),c},string:function(t,e,r,o,n,i,s){var a,l=s.alignEmptyValues,u=0;if(t){if(e){switch(_typeof(s.locale)){case"boolean":s.locale&&(a=this.table.modules.localize.getLocale());break;case"string":a=s.locale}return String(t).toLowerCase().localeCompare(String(e).toLowerCase(),a)}u=1}else u=e?-1:0;return("top"===l&&"desc"===i||"bottom"===l&&"asc"===i)&&(u*=-1),u},date:function(t,e,r,o,n,i,s){return s.format||(s.format="DD/MM/YYYY"),this.sorters.datetime.call(this,t,e,r,o,n,i,s)},time:function(t,e,r,o,n,i,s){return s.format||(s.format="HH:mm"),this.sorters.datetime.call(this,t,e,r,o,n,i,s)},datetime:function(t,e,r,o,n,i,s){var a=s.format||"DD/MM/YYYY HH:mm:ss",l=s.alignEmptyValues,u=0;if("undefined"!=typeof moment){if(t=moment(t,a),e=moment(e,a),t.isValid()){if(e.isValid())return t-e;u=1}else u=e.isValid()?-1:0;return("top"===l&&"desc"===i||"bottom"===l&&"asc"===i)&&(u*=-1),u}console.error("Sort Error - 'datetime' sorter is dependant on moment.js")},boolean:function(t,e,r,o,n,i,s){return(!0===t||"true"===t||"True"===t||1===t?1:0)-(!0===e||"true"===e||"True"===e||1===e?1:0)},array:function(t,e,r,o,n,i,s){function a(t){switch(c){case"length":return t.length;case"sum":return t.reduce(function(t,e){return t+e});case"max":return Math.max.apply(null,t);case"min":return Math.min.apply(null,t);case"avg":return t.reduce(function(t,e){return t+e})/t.length}}var l=0,u=0,c=s.type||"length",d=s.alignEmptyValues,m=0;if(Array.isArray(t)){if(Array.isArray(e))return l=t?a(t):0,u=e?a(e):0,l-u;d=1}else d=Array.isArray(e)?-1:0;return("top"===d&&"desc"===i||"bottom"===d&&"asc"===i)&&(m*=-1),m},exists:function(t,e,r,o,n,i,s){return(void 0===t?0:1)-(void 0===e?0:1)},alphanum:function(t,e,r,o,n,i,s){var a,l,u,c,d,m=0,f=/(\d+)|(\D+)/g,p=/\d/,h=s.alignEmptyValues,g=0;if(t||0===t){if(e||0===e){if(isFinite(t)&&isFinite(e))return t-e;if(a=String(t).toLowerCase(),l=String(e).toLowerCase(),a===l)return 0;if(!p.test(a)||!p.test(l))return a>l?1:-1;for(a=a.match(f),l=l.match(f),d=a.length>l.length?l.length:a.length;m<d;)if(u=a[m],c=l[m++],u!==c)return isFinite(u)&&isFinite(c)?("0"===u.charAt(0)&&(u="."+u),"0"===c.charAt(0)&&(c="."+c),u-c):u>c?1:-1;return a.length>l.length}g=1}else g=e||0===e?-1:0;return("top"===h&&"desc"===i||"bottom"===h&&"asc"===i)&&(g*=-1),g}},Tabulator.prototype.registerModule("sort",Sort);