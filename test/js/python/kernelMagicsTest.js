/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('Tests for kernel magic. ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/kernelMagicsTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('%%groovy ', function () {
    it('Should display stdout and execute results ', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var output = beakerxPO.getAllOutputsStdout(codeCell)[0];
      expect(output.getText()).toMatch(/stdout works/);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.getText()).toMatch(/results work/);
    });
  });

});