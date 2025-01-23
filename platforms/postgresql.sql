create or replace function jsdoc_parse(str varchar)
  returns jsonb
  language plpgsql
  stable
as $fn$
/**
 * Function parse jsdoc and returns jsonb structure<br />
 * Function remove comment characters from string.
 * 
 * @author cmtdoc parser (https://github.com/grobinx/cmtdoc-parser)
 * @created Thu Jan 23 2025 15:36:20 GMT+0100 (czas środkowoeuropejski standardowy)
 * 
 * @param {varchar|text} str string to parse
 * @returns {jsonb}
 * @example
 * select p.proname, jsdoc_parse(p.doc) as doc, p.arguments, p.description
 *   from (select p.proname, substring(pg_get_functiondef(p.oid) from '\/\*\*.*\*\/') as doc, 
 *                coalesce(pg_get_function_arguments(p.oid), '') arguments,
 *                d.description
 *           from pg_proc p
 *                join pg_namespace n on n.oid = p.pronamespace
 *                left join pg_description d on d.classoid = 'pg_proc'::regclass and d.objoid = p.oid and d.objsubid = 0
 *          where n.nspname = :scema_name
 *            and p.proisagg is false) p
 *  where p.doc is not null
 */
begin
  str := string_agg(substring(line from '^\s*\*\s*(.*)'), e'\n')
    from (select unnest(string_to_array(str, e'\n')) line) d
   where trim(line) not in ('/**', '*/');
  --
  return jsonb_object_agg(r.figure, r.object)
    from (    select 'root' as figure, to_jsonb(r[1]) as object
      from regexp_matches(str, '^([^@]+)') r
    union all
    select 'param' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[3] as "type", coalesce(r[7], r[11]) as "name", r[9] as "default", r[13] as "description", string_to_array(trim(r[3]), '|') as "types"
              from regexp_matches(str, '@(param|arg|argument)(\s*{([^{]*)?})?((\s*\[(([^\[\=]+)\s*(\=\s*([^\[]*)?)?)?\])|(\s+([^\s@]+)))(\s*([^@]*)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'property' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[3] as "type", coalesce(r[7], r[11]) as "name", r[9] as "default", r[13] as "description", string_to_array(trim(r[3]), '|') as "types"
              from regexp_matches(str, '@(property|prop)(\s*{([^{]*)?})?((\s*\[(([^\[\=]+)\s*(\=\s*([^\[]*)?)?)?\])|(\s+([^\s@]+)))(\s*([^@]*)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'async' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(async)[[:>:]]') r
    union all
    select 'generator' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(generator)[[:>:]]') r
    union all
    select 'global' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(global)[[:>:]]') r
    union all
    select 'hideconstructor' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(hideconstructor)[[:>:]]') r
    union all
    select 'ignore' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(ignore)[[:>:]]') r
    union all
    select 'inner' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(inner)[[:>:]]') r
    union all
    select 'instance' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(instance)[[:>:]]') r
    union all
    select 'override' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(override)[[:>:]]') r
    union all
    select 'public' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(public)[[:>:]]') r
    union all
    select 'readonly' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(readonly)[[:>:]]') r
    union all
    select 'static' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(static)[[:>:]]') r
    union all
    select 'abstract' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(abstract|virtual)[[:>:]]') r
    union all
    select 'access' as figure, to_jsonb(r[2]) as object
      from regexp_matches(str, '@(access)\s+(package|private|protected|public)[[:>:]]') r
    union all
    select 'alias' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "path", r[5] as "description"
              from regexp_matches(str, '@(alias)(\s+([^\s@]+))(\s*([^@]*)?)?') r) r
    union all
    select 'augments' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[3] as "path", r[5] as "description"
              from regexp_matches(str, '@(augments|extends)(\s+([^\s@]+))(\s*([^@]*)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'author' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[3] as "author", r[5] as "email", r[7] as "page", r[10] as "description"
              from regexp_matches(str, '@(author)(\s+([^@\-<{\(]+))(\s*<([^<]*)>)?(\s*\(([^\(]*)\))?(\s*\-(\s*([^@]*)?)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'borrows' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "that", r[5] as "this", r[7] as "description"
              from regexp_matches(str, '@(borrows)(\s+([^\s@]+))\s*as\s*(\s+([^\s@]+))(\s*([^@]*)?)?') r) r
    union all
    select 'class' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "type", r[5] as "name"
              from regexp_matches(str, '@(constructor|class)(\s*{([^{]*)?})?(\s+([^\s@]+))') r) r
    union all
    select 'class' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(constructor|class)[[:>:]]') r
    union all
    select 'constant' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "type", r[5] as "name"
              from regexp_matches(str, '@(constant|const)(\s*{([^{]*)?})(\s+([^\s@]+))?') r) r
    union all
    select 'constructs' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(constructs)(\s+([^\s@]+))') r
    union all
    select 'constructs' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(constructs)[[:>:]]') r
    union all
    select 'copyright' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(copyright)(\s*([^@]*)?)') r
    union all
    select 'default' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(default|defaultvalue)(\s+([^\s@]+))') r
    union all
    select 'default' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(default|defaultvalue)[[:>:]]') r
    union all
    select 'deprecated' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(deprecated)(\s*([^@]*)?)') r
    union all
    select 'deprecated' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(deprecated)[[:>:]]') r
    union all
    select 'description' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(description|desc|classdesc)(\s*([^@]*)?)', 'g') r
    having array_agg(r[3]) is not null
    union all
    select 'enum' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(enum)(\s*{([^{]*)?})(\s+([^\s@]+))?') r
    union all
    select 'enum' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(enum)[[:>:]]') r
    union all
    select 'event' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(event)(\s+([^\s@]+))', 'g') r
    having array_agg(r[3]) is not null
    union all
    select 'example' as figure, to_jsonb(array_agg(r[2])) as object
      from regexp_matches(str, '@(example)(\s*([^@]*)?)', 'g') r
    having array_agg(r[2]) is not null
    union all
    select 'exports' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(exports)(\s+([^\s@]+))') r
    union all
    select 'external' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(external|host)(\s+([^\s@]+))') r
    union all
    select 'file' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(file|fileoverview|overview)(\s*([^@]*)?)') r
    union all
    select 'event' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(fires|emits)(\s+([^\s@]+))', 'g') r
    having array_agg(r[3]) is not null
    union all
    select 'function' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(function|func|method)(\s+([^\s@]+))') r
    union all
    select 'function' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(function|func|method)[[:>:]]') r
    union all
    select 'implements' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(implements)(\s+([^\s@]+))') r
    union all
    select 'interface' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(interface)(\s+([^\s@]+))') r
    union all
    select 'interface' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(interface)[[:>:]]') r
    union all
    select 'created' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(created)(\s*([^@]*)?)') r
    union all
    select 'kind' as figure, to_jsonb(r[2]) as object
      from regexp_matches(str, '@(kind)\s+(class|constant|event|external|file|function|member|mixin|module|namespace|typedef)[[:>:]]') r
    union all
    select 'lends' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(lends)(\s+([^\s@]+))') r
    union all
    select 'license' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(license)(\s*([^@]*)?)') r
    union all
    select 'listens' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(listens)(\s+([^\s@]+))', 'g') r
    having array_agg(r[3]) is not null
    union all
    select 'variable' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "type", r[5] as "name"
              from regexp_matches(str, '@(var|variable|member)(\s*{([^{]*)?})(\s+([^\s@]+))?') r) r
    union all
    select 'memberof' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(memberof|memberof!)(\s+([^\s@]+))') r
    union all
    select 'mixes' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(mixes)(\s+([^\s@]+))') r
    union all
    select 'mixin' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(mixin)(\s+([^\s@]+))') r
    union all
    select 'mixin' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(mixin)[[:>:]]') r
    union all
    select 'module' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(module)(\s+([^\s@]+))') r
    union all
    select 'module' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(module)[[:>:]]') r
    union all
    select 'namespace' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(namespace)(\s+([^\s@]+))') r
    union all
    select 'namespace' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(namespace)[[:>:]]') r
    union all
    select 'name' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(name)(\s+([^\s@]+))') r
    union all
    select 'package' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(package)(\s*{([^{]*)?})') r
    union all
    select 'package' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(package)[[:>:]]') r
    union all
    select 'private' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(private)(\s*{([^{]*)?})') r
    union all
    select 'private' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(private)[[:>:]]') r
    union all
    select 'protected' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(protected)(\s*{([^{]*)?})') r
    union all
    select 'protected' as figure, to_jsonb(true) as object
      from regexp_matches(str, '@(protected)[[:>:]]') r
    union all
    select 'requires' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(requires)(\s+([^\s@]+))', 'g') r
    having array_agg(r[3]) is not null
    union all
    select 'returns' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "type", r[5] as "description", string_to_array(trim(r[3]), '|') as "types"
              from regexp_matches(str, '@(returns|return)(\s*{([^{]*)?})(\s*([^@]*)?)?') r) r
    union all
    select 'see' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select coalesce(r[4], r[6]) as "path", r[8] as "description"
              from regexp_matches(str, '@(see)((\s*{([^{]*)?})|(\s+([^\s@]+)))(\s*([^@]*)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'since' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(since)(\s*([^@]*)?)') r
    union all
    select 'summary' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(summary)(\s*([^@]*)?)') r
    union all
    select 'this' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(this)(\s+([^\s@]+))') r
    union all
    select 'throws' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[3] as "type", r[5] as "description"
              from regexp_matches(str, '@(throws|exception)(\s*{([^{]*)?})(\s*([^@]*)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'todo' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(todo)(\s*([^@]*)?)', 'g') r
    having array_agg(r[3]) is not null
    union all
    select 'typedef' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "type", r[5] as "name"
              from regexp_matches(str, '@(typedef)(\s*{([^{]*)?})?(\s+([^\s@]+))') r) r
    union all
    select 'tutorial' as figure, to_jsonb(array_agg(r[4])) as object
      from regexp_matches(str, '@(tutorial)((\s*{([^{]*)?})|(\s+([^\s@]+)))', 'g') r
    having array_agg(r[4]) is not null
    union all
    select 'type' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(type)(\s*{([^{]*)?})') r
    union all
    select 'variation' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(variation)(\s+([^\s@]+))') r
    union all
    select 'version' as figure, to_jsonb(r[3]) as object
      from regexp_matches(str, '@(version)(\s*([^@]*)?)') r
    union all
    select 'yield' as figure, row_to_json(r)::jsonb as object
      from (select r[3] as "type", r[5] as "description"
              from regexp_matches(str, '@(yield|yields|next)(\s*{([^{]*)?})?(\s*([^@]*)?)?') r) r
    union all
    select 'change' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[3] as "date", r[6] as "author", r[8] as "description"
              from regexp_matches(str, '@(change|changed|changelog|modified)(\s+([^\s@]+))?(\s*<([^<]*)>)?(\s*([^@]*)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'isue' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(isue)(\s*([^@]*)?)', 'g') r
    having array_agg(r[3]) is not null
    union all
    select 'figure' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[2] as "figure", r[7] as "description"
              from regexp_matches(str, '@(figure|form)((\s+([^\s@]+))(\s*\(([^\(]*)\)))(\s*([^@]*)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'template' as figure, jsonb_agg(row_to_json(r)::jsonb) as object
      from (select r[3] as "type", r[5] as "name", r[8] as "description", string_to_array(trim(r[3]), '|') as "types", string_to_array(trim(r[5]), ',') as "names"
              from regexp_matches(str, '@(template)(\s*{([^{]*)?})?(\s+([^@\-<{\(]+))(\s*\-(\s*([^@]*)?)?)?', 'g') r) r
    having jsonb_agg(row_to_json(r)::jsonb) is not null
    union all
    select 'callback' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(callback)(\s+([^\s@]+))', 'g') r
    having array_agg(r[3]) is not null) r;
end;
$fn$;