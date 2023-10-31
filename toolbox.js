
	  //
	  //
	  //
	  //
	  //http://www.competentedigitale.ro/blockly/demos/toolbox/index.html
	  //https://github.com/google/blockly/issues/4464
 let fullToolbox=[
	  /*
      ],
      "categorystyle": "logic_category"
    },
    */
        { "kind": "block", "type": "controls_if" },
        { "kind": "block", "type": "logic_compare" },
        { "kind": "block", "type": "logic_operation" },
        { "kind": "block", "type": "logic_negate" },
        { "kind": "block", "type": "logic_boolean" },
        { "kind": "block", "type": "logic_null" },
        { "kind": "block", "type": "logic_ternary" },
	  /* 
    {
      "kind": "category",
      "name": "Loops",
      "contents": [
      */
        { "kind": "block", "type": "controls_repeat_ext", "inputs": { "TIMES": { "shadow": { "type": "math_number", "fields": { "NUM": "10" } } } } },
        { "kind": "block", "type": "controls_whileUntil" },
        { "kind": "block", "type": "controls_for", "inputs": { 
		"FROM": { "shadow": { "type": "math_number", "fields": { "NUM": "1" } } }, 
		"TO": { "shadow": { "type": "math_number", "fields": { "NUM": "10" } } }, 
		"BY": { "shadow": { "type": "math_number", "fields": { "NUM": "1" } } } 
	  } },
        { "kind": "block", "type": "controls_forEach" },
        { "kind": "block", "type": "controls_flow_statements" },
	  /*
      ],
      "categorystyle": "loop_category"
    },
	  */

	  /* 
    {
      "kind": "category",
      "name": "Math",
      "contents": [
      */
        {
          "kind": "block",
          "type": "math_number",
          "fields": {
            "NUM": "123"
          }
        },
        {
          "kind": "block",
          "type": "math_arithmetic",
          "inputs": {
            "A": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "1"
                }
              }
            },
            "B": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "1"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_single",
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "9"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_trig",
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "45"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_constant"
        },
        {
          "kind": "block",
          "type": "math_number_property",
          "inputs": {
            "NUMBER_TO_CHECK": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "0"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_round",
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "3.1"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_on_list"
        },
        {
          "kind": "block",
          "type": "math_modulo",
          "inputs": {
            "DIVIDEND": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "64"
                }
              }
            },
            "DIVISOR": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "10"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_constrain",
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "50"
                }
              }
            },
            "LOW": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "1"
                }
              }
            },
            "HIGH": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "100"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_random_int",
          "inputs": {
            "FROM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "1"
                }
              }
            },
            "TO": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "100"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "math_random_float"
        },
        {
          "kind": "block",
          "type": "math_atan2",
          "inputs": {
            "X": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "1"
                }
              }
            },
            "Y": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "1"
                }
              }
            }
          }
        },
	  /*
      ],
      "categorystyle": "math_category"
    },
	  */
	  /* 
    {
      "kind": "category", "name": "Text", "contents": [
      */
        { "kind": "block", "type": "text" },
        { "kind": "block", "type": "text_join" },
        { "kind": "block", "type": "text_append",
          "inputs": {
            "TEXT": { "shadow": { "type": "text" } }
          }
        },
        {
          "kind": "block",
          "type": "text_length",
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": "abc"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_isEmpty",
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": null
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_indexOf",
          "inputs": {
            "VALUE": {
              "block": {
                "type": "variables_get",
                "fields": {
                  "VAR": "{textVariable}"
                }
              }
            },
            "FIND": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": "abc"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_charAt",
          "inputs": {
            "VALUE": {
              "block": {
                "type": "variables_get",
                "fields": {
                  "VAR": "{textVariable}"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_getSubstring",
          "inputs": {
            "STRING": {
              "block": {
                "type": "variables_get",
                "fields": {
                  "VAR": "{textVariable}"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_changeCase",
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": "abc"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_trim",
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": "abc"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_print",
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": "abc"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "text_prompt_ext",
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": "abc"
                }
              }
            }
          }
        },
	      /*
      ],
      "categorystyle": "text_category"
    },
	  */
	  /* 
    {
      "kind": "category",
      "name": "Lists",
      "contents": [
	      */
        {
          "kind": "block",
          "type": "lists_create_with",
          "extraState": {
            "itemCount": "0"
          }
        },
        {
          "kind": "block",
          "type": "lists_create_with"
        },
        {
          "kind": "block",
          "type": "lists_repeat",
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "5"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "lists_length"
        },
        {
          "kind": "block",
          "type": "lists_isEmpty"
        },
        {
          "kind": "block",
          "type": "lists_indexOf",
          "inline": false,
          "inputs": {
            "VALUE": {
              "block": {
                "type": "variables_get",
                "fields": {
                  "VAR": "{listVariable}"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "lists_getIndex",
          "inputs": {
            "VALUE": {
              "block": {
                "type": "variables_get",
                "fields": {
                  "VAR": "{listVariable}"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "lists_setIndex",
          "inputs": {
            "LIST": {
              "block": {
                "type": "variables_get",
                "fields": {
                  "VAR": "{listVariable}"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "lists_getSublist",
          "inputs": {
            "LIST": {
              "block": {
                "type": "variables_get",
                "fields": {
                  "VAR": "{listVariable}"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "lists_split",
          "inputs": {
            "DELIM": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": ","
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "lists_sort"
        },
	    /*
      ],
      "categorystyle": "list_category"
    },
    {
      "kind": "category",
      "name": "Colour",
      "contents": [
	  */
        {
          "kind": "block",
          "type": "colour_picker"
        },
        {
          "kind": "block",
          "type": "colour_random"
        },
        {
          "kind": "block",
          "type": "colour_rgb",
          "inputs": {
            "RED": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "100"
                }
              }
            },
            "GREEN": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "50"
                }
              }
            },
            "BLUE": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "0"
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "colour_blend",
          "inputs": {
            "COLOUR1": {
              "shadow": {
                "type": "colour_picker",
                "fields": {
                  "COLOUR": "#ff0000"
                }
              }
            },
            "COLOUR2": {
              "shadow": {
                "type": "colour_picker",
                "fields": {
                  "COLOUR": "#3333ff"
                }
              }
            },
            "RATIO": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": "0.5"
                }
              }
            }
          }
        },
	      /*
      ],
      "categorystyle": "colour_category"
    },
    {
      "kind": "sep"
    },
	  */

	 /*
    {
      "kind": "category",
      "name": "Variables",
      "contents": [],
      "custom": "VARIABLE",
      "categorystyle": "variable_category"
    },
	 */
    {
      "kind": "category",
      "name": "Functions",
      "contents": [],
      "type": "procedures",
      "custom": "PROCEDURE",
      "categorystyle": "procedure_category"
    },
    // repeated repeat { "kind": "block", "type": "controls_whileUntil" },

	{"kind":"block", "type": "variables_get", "message0": "%1", "args0": [ { "type": "field_variable", "name": "VAR", "variable": "%{BKY_VARIABLES_DEFAULT_NAME}" } ], "output": null, "colour": "%{BKY_VARIABLES_HUE}", "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}", "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}", "extensions": ["contextMenu_variableSetterGetter"] },
	 {"kind":"block", "type": "variables_set", "message0": "%{BKY_VARIABLES_SET}", "args0": [ { "type": "field_variable", "name": "VAR", "variable": "%{BKY_VARIABLES_DEFAULT_NAME}" }, { "type": "input_value", "name": "VALUE" } ], "previousStatement": null, "nextStatement": null, "colour": "%{BKY_VARIABLES_HUE}", "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}", "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}", "extensions": ["contextMenu_variableSetterGetter"] },
   /*{ "kind": "button",  "type":"allocate_variable","text": "Allocate string variable",  "callbackKey": "allocateStringVariable", "vartype":"string"},
   { "kind": "button",  "type":"allocate_variable","text": "Allocate int variable",  "callbackKey": "allocateIntVariable", "vartype":"int"},
   { "kind": "button",  "type":"allocate_variable","text": "Allocate float variable",  "callbackKey": "allocateFloatVariable", "vartype":"float"},
   { "kind": "button",  "type":"allocate_variable","text": "Allocate list variable",  "callbackKey": "allocateListVariable", "vartype":"list"},
   { "kind": "button",  "type":"allocate_variable","text": "Allocate boolean variable",  "callbackKey": "allocateBooleanVariable", "vartype":"boolean"},*/
   { "kind": "button",  "type":"allocate_variable","text": "Allocate variable",  "callbackKey": "allocateVariable","vartype":"string" },


  ];




	  /* old versions?
	   {
      kind: 'CATEGORY',
      contents: [
        {
          kind: 'BLOCK',
          blockxml: '<block type="controls_if"></block>',
          type: 'controls_if',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_compare"></block>',
          type: 'logic_compare',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_operation"></block>',
          type: 'logic_operation',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_negate"></block>',
          type: 'logic_negate',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_boolean"></block>',
          type: 'logic_boolean',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_null"></block>',
          type: 'logic_null',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_ternary"></block>',
          type: 'logic_ternary',
        },
      ],
      id: 'catLogic',
      colour: '210',
      name: 'Logic',
    },
    {
      kind: 'CATEGORY',
      contents: [
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="controls_repeat_ext">\n          <value name="TIMES">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'controls_repeat_ext',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="controls_whileUntil"></block>',
          type: 'controls_whileUntil',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="controls_for">\n          <value name="FROM">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="TO">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n          <value name="BY">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'controls_for',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="controls_forEach"></block>',
          type: 'controls_forEach',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="controls_flow_statements"></block>',
          type: 'controls_flow_statements',
        },
      ],
      id: 'catLoops',
      colour: '120',
      name: 'Loops',
    },
    {
      kind: 'CATEGORY',
      contents: [
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_number"></block>',
          type: 'math_number',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_arithmetic">\n          <value name="A">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="B">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_arithmetic',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_single">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">9</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_single',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_trig">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">45</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_trig',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_constant"></block>',
          type: 'math_constant',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_number_property">\n          <value name="NUMBER_TO_CHECK">\n            <shadow type="math_number">\n              <field name="NUM">0</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_number_property',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_change">\n          <value name="DELTA">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_change',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_round">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">3.1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_round',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_on_list"></block>',
          type: 'math_on_list',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_modulo">\n          <value name="DIVIDEND">\n            <shadow type="math_number">\n              <field name="NUM">64</field>\n            </shadow>\n          </value>\n          <value name="DIVISOR">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_modulo',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_constrain">\n          <value name="VALUE">\n            <shadow type="math_number">\n              <field name="NUM">50</field>\n            </shadow>\n          </value>\n          <value name="LOW">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="HIGH">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_constrain',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_random_int">\n          <value name="FROM">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="TO">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_random_int',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_random_float"></block>',
          type: 'math_random_float',
        },
      ],
      id: 'catMath',
      colour: '230',
      name: 'Math',
    },
    {
      kind: 'CATEGORY',
      contents: [
        {
          kind: 'BLOCK',
          blockxml: '<block type="text"></block>',
          type: 'text',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="text_join"></block>',
          type: 'text_join',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_append">\n          <value name="TEXT">\n            <shadow type="text"></shadow>\n          </value>\n        </block>',
          type: 'text_append',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_length">\n          <value name="VALUE">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_length',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_isEmpty">\n          <value name="VALUE">\n            <shadow type="text">\n              <field name="TEXT"></field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_isEmpty',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_indexOf">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n          <value name="FIND">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_indexOf',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_charAt">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n        </block>',
          type: 'text_charAt',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_getSubstring">\n          <value name="STRING">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n        </block>',
          type: 'text_getSubstring',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_changeCase">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_changeCase',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_trim">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_trim',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_print">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_print',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_prompt_ext">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_prompt_ext',
        },
      ],
      id: 'catText',
      colour: '160',
      name: 'Text',
    },
    {
      kind: 'CATEGORY',
      contents: [
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_create_with">\n          <mutation items="0"></mutation>\n        </block>',
          type: 'lists_create_with',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_create_with"></block>',
          type: 'lists_create_with',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_repeat">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">5</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'lists_repeat',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_length"></block>',
          type: 'lists_length',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_isEmpty"></block>',
          type: 'lists_isEmpty',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_indexOf">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_indexOf',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_getIndex">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_getIndex',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_setIndex">\n          <value name="LIST">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_setIndex',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_getSublist">\n          <value name="LIST">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_getSublist',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_split">\n          <value name="DELIM">\n            <shadow type="text">\n              <field name="TEXT">,</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'lists_split',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_sort"></block>',
          type: 'lists_sort',
        },
      ],
      id: 'catLists',
      colour: '260',
      name: 'Lists',
    },
    {
      kind: 'CATEGORY',
      contents: [
        {
          kind: 'BLOCK',
          blockxml: '<block type="colour_picker"></block>',
          type: 'colour_picker',
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="colour_random"></block>',
          type: 'colour_random',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="colour_rgb">\n          <value name="RED">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n          <value name="GREEN">\n            <shadow type="math_number">\n              <field name="NUM">50</field>\n            </shadow>\n          </value>\n          <value name="BLUE">\n            <shadow type="math_number">\n              <field name="NUM">0</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'colour_rgb',
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="colour_blend">\n          <value name="COLOUR1">\n            <shadow type="colour_picker">\n              <field name="COLOUR">#ff0000</field>\n            </shadow>\n          </value>\n          <value name="COLOUR2">\n            <shadow type="colour_picker">\n              <field name="COLOUR">#3333ff</field>\n            </shadow>\n          </value>\n          <value name="RATIO">\n            <shadow type="math_number">\n              <field name="NUM">0.5</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'colour_blend',
        },
      ],
      id: 'catColour',
      colour: '20',
      name: 'Color',
    },
    {
      kind: 'SEP',
    },
    {
      kind: 'CATEGORY',
      id: 'catVariables',
      colour: '330',
      custom: 'VARIABLE',
      name: 'Variables',
    },
    {
      kind: 'CATEGORY',
      id: 'catFunctions',
      colour: '290',
      custom: 'PROCEDURE',
      name: 'Functions',
    },
	  /*
    { "kind": "category", "type": "lists" },
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "controls_repeat_ext"
    },
    {
      "kind": "block",
      "type": "logic_compare"
    },
    {
      "kind": "block",
      "type": "math_number"
    },
    {
      "kind": "block",
      "type": "math_arithmetic"
    },
    {
      "kind": "block",
      "type": "text"
    },
    {
      "kind": "block",
      "type": "text_print"
    },
	  
	  */



/*

{
  "blocks": { "blocks": [
      {
        "type": "variables_set",
        "inputs": {
          "VALUE": {
            "block": {
              "type": "lists_split",...
            }
          }
        },

        "next": {

          "block": { }
      },

      {
        "type": "lists_setIndex",
        "fields": {
          "MODE": "SET",
          "WHERE": "FROM_START"
        },
        "inputs": {
          "LIST": {
            "block": {
            }
          }
        }
      },

      {
        "type": "lists_split",...
      },
      {
        "type": "variables_set"
      }
    ]
  }
}
 * */
function getToolboxStart(startBlock,extra) {
	function onlyUnique(value, index, array) {
	  return array.indexOf(value) === index;
	}
	return getToolbox((extra.concat(getToolboxStartHelp(startBlock))).filter(onlyUnique))
}
function getToolboxStartHelp(startBlock) {
   let elArr = []
   if (Array.isArray(startBlock)) {
	    for (const block of startBlock) {
		elArr=elArr.concat(getToolboxStartHelp(block))
	    }
	    return elArr
   } else if (startBlock.constructor == Object) { 
	// https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
	for (const [key, value] of Object.entries(startBlock)) {
	  if (key=="type") { 
		elArr=elArr.concat([value])
	  } else {
		elArr=elArr.concat(getToolboxStartHelp(value))
	  }
	}
	return elArr
   }
   // not an array or dictionary
   return elArr
  
}

function getToolbox(elArr) {
	// just an editor hack
	/*
	[
    "controls_if", "logic_compare", "logic_operation", "logic_negate", "logic_boolean", "logic_null", "logic_ternary",
    "controls_repeat_ext", "controls_whileUntil", "controls_for", "controls_forEach", "controls_flow_statements",
    "math_number", "math_arithmetic", "math_single", "math_trig", "math_constant", "math_number_property", "math_round", "math_on_list", "math_modulo", "math_constrain", "math_random_int", "math_random_float", "math_atan2",
    "text", "text_join", "text_append", "text_length", "text_isEmpty", "text_indexOf", "text_charAt", "text_getSubstring", "text_changeCase", "text_trim", "text_print", "text_prompt_ext",
    "lists_create_with", "lists_create_with", "lists_repeat", "lists_length", "lists_isEmpty", "lists_indexOf", "lists_getIndex", "lists_setIndex", "lists_getSublist", "lists_split", "lists_sort",
    // lists_create_empty
    "colour_picker", "colour_random", "colour_rgb", "colour_blend",
    null,
    "procedures",
...
]

*/
 let simpleJson=fullToolbox
  if (elArr.length==0) {
	  simple=[]
	  for (const template of simpleJson) {
		  simple.push(template["type"])
	  }
	  console.log("Toolbox all types:")
	  console.log(simple)
	  return { "kind": "flyoutToolbox", "contents":  simpleJson  }
  }
  contents=[]
  for (const el of elArr) {
	  console.log(el)
    for (const template of simpleJson) {
      if (template["type"]==el) {
        contents.push( template )
      }
    }
    if (false) {
      switch (el) {
        case "lists_create_empty_ignore":

  	  contents.push( { "kind": "block", "type": el })
        default:
      }
   }
  }
  return { "kind": "flyoutToolbox", "contents":  contents  }
}
