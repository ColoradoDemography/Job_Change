// @flow

module.exports = function() {
    'use strict';

    var opt2div = L.DomUtil.create('div', '');
    opt2div.id = 'opt2div';
    opt2div.className = "form-group has-feedback";
    var w = L.DomUtil.create('input', '', opt2div);
    w.id = "slgid";
    w.class = 'typeahead';
    w.type = 'text';
    w.placeholder = "Place Search...";
    w.className = "form-control typeahead";
    return opt2div;
};