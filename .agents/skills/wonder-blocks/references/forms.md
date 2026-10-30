# Wonder Blocks: Forms

Examples read translated text from `strings` (`const {strings} = usePerseusI18n();`).

## Choosing form components

| Input type | Component |
| --- | --- |
| Single-line text | `TextField` from `wonder-blocks-form` |
| Multi-line text | `TextArea` from `wonder-blocks-form` |
| Single checkbox | `Checkbox` from `wonder-blocks-form` |
| Multiple checkboxes | `CheckboxGroup` + `Choice` from `wonder-blocks-form` |
| Radio buttons | `RadioGroup` + `Choice` from `wonder-blocks-form` |
| Single select dropdown | `SingleSelect` + `OptionItem` from `wonder-blocks-dropdown` |
| Multi select dropdown | `MultiSelect` + `OptionItem` from `wonder-blocks-dropdown` |
| Search input | `SearchField` from `wonder-blocks-search-field` |

- When using `TextArea`, set `autoResize` to `true` so that it resizes based on
  content. If needed, the `rows` and `maxRows` props can be used to configure
  the starting and maximum number of rows.
- Only use `RadioGroup`/`CheckboxGroup` and `Choice` when working on forms. Use
  `perseus` components when working on UI related to exercises or widgets.

## Always wrap fields with LabeledField

Use `LabeledField` from `wonder-blocks-labeled-field` with `TextField`,
`TextArea`, `SingleSelect`, `MultiSelect`, and `SearchField` components. It
handles `htmlFor`/`id` wiring and setting `aria-describedby` for the related
description, error message, etc.

```tsx
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {TextField} from "@khanacademy/wonder-blocks-form";

<LabeledField
    label={strings.fieldName}
    description={strings.descriptionForThe}
    field={
        <TextField
            value={name}
            onChange={setName}
        />
    }
/>
```

For dropdowns, pass `SingleSelect` or `MultiSelect` as the `field` prop:

```tsx
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {OptionItem, SingleSelect, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";

// Single select
<LabeledField
    label={strings.category}
    field={
        <SingleSelect
            placeholder={strings.chooseACategory}
            selectedValue={selectedValue}
            onChange={setSelectedValue}
        >
            <OptionItem label={strings.option1} value="option1" />
            <OptionItem label={strings.option2} value="option2" />
            <OptionItem label={strings.option3} value="option3" />
        </SingleSelect>
    }
/>

// Multi select
<LabeledField
    label={strings.categories}
    field={
        <MultiSelect
            selectedValues={selectedValues}
            onChange={setSelectedValues}
        >
            <OptionItem label={strings.option1} value="option1" />
            <OptionItem label={strings.option2} value="option2" />
            <OptionItem label={strings.option3} value="option3" />
        </MultiSelect>
    }
/>
```

If the width/inlineSize of a field needs to be set, set it using `LabeledField`'s
`styles.root` prop so that associated helper text is properly aligned with the
field.

`LabeledField` props:

- `field` — required. The form input component to render
- `label` — required. The visible field label
- `contextLabel` — Used to provide context for a field. It is often used to mark
  a field as "required" or "optional". These strings should be translated and
  all lowercase. If it is required, make sure to set the `required` prop on the
  form field.
- `description` — The main helper text shown for a field
- `errorMessage` — The error message to display. `LabeledField` will pass in an
  `error` prop to the `field` component so that the field has error styling and
  attributes.
- `readOnlyMessage` — The helper text to display that is specifically related to
  the read only state of the field. `LabeledField` will pass in a `readOnly`
  prop to the `field` component so that the field has readOnly styling and
  attributes.
- `additionalHelperMessage` — For any other helper text

Prefer using these props instead of implementing custom labels and helper
messages.

For checkboxes and radio groups, use the `CheckboxGroup` and `RadioGroup`
components which support `label`, `description`, and `errorMessage` props.

```tsx
import {CheckboxGroup, RadioGroup, Choice} from "@khanacademy/wonder-blocks-form";

// Multiple checkboxes
const [selectedValues, setSelectedValues] = useState<string[]>([]);

<CheckboxGroup
    label={strings.chooseYourOptions}
    description={strings.selectAllThat}
    errorMessage={checkboxError}
    groupName="options"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
>
    <Choice label={strings.option1} value="option1" />
    <Choice label={strings.option2} value="option2" />
    <Choice label={strings.option3} value="option3" />
</CheckboxGroup>

// Radio buttons
const [selectedValue, setSelectedValue] = useState<string>("");

<RadioGroup
    label={strings.chooseOneOption}
    description={strings.selectTheOption}
    errorMessage={radioError}
    groupName="option"
    onChange={setSelectedValue}
    selectedValue={selectedValue}
>
    <Choice label={strings.option1} value="option1" />
    <Choice label={strings.option2} value="option2" />
    <Choice label={strings.option3} value="option3" />
</RadioGroup>
```

## Form field states

Form field components such as `TextField`, `TextArea`, `SingleSelect`, and
`MultiSelect` support the following props for various states:

- `error`: Whether the field is in an error state. Use with `LabeledField`'s
  `errorMessage` prop to provide context on why there is an error.
- `disabled`: Whether the field cannot be interacted with.
- `readOnly`: Whether the field can only be read. Use with `LabeledField`'s
  `readOnlyMessage` prop to provide context on why it is read only. Prefer
  using `readOnly` over `disabled` if the value is important for a user to be
  able to see and explore that locked input's content.
- `required`: Whether the field is required. Use with `LabeledField`'s
  `contextLabel` prop set to a translated `required` string.

For a `Choice` component within `RadioGroup` and `CheckboxGroup`, it can be put
in a disabled state using the `disabled` prop. The group can be put in an error
state by using the `errorMessage` prop on `RadioGroup` and `CheckboxGroup`.

## Form validation

### Validation props

Form fields such as `TextField`, `TextArea`, `SingleSelect` and `MultiSelect`
have built-in validation support via three props:

- `validate` — function that receives the current value and returns an error
  string if the value is invalid.
- `onValidate` — called after validation runs. It receives the resulting error
  string (or `undefined` if there is no error message). Use this to sync the
  error into local state so it can be passed to the `errorMessage` prop for
  `LabeledField`. If `validate` is set, `onValidate` should be used to show
  the error message to the user.
- `instantValidation` (`TextField` and `TextArea` only) — set to `false` to
  only validate on blur, not on every keystroke. Instant validation is
  extremely disruptive to screen reader users. This should only be set if the
  `validate` prop is used.
- `required` - Marks the field as required. Pass in a translated string for
  the error message to show when the required field is not filled in. Use this
  prop with `onValidate` to that the `LabeledField`'s `errorMessage` prop can be
  set. Also use that required field error message if the field is empty when the
  form is submitted

```tsx

const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);
const [value, setValue] = useState<string>("");

<LabeledField
    label={strings.title}
    errorMessage={errorMessage}
    field={
        <TextField
            value={value}
            onChange={setValue}
            instantValidation={false}
            validate={(value) => {
                if (value.trim().length < 5) {
                    return strings.titleMustBe;
                }
            }}
            onValidate={setErrorMessage}
        />
    }
/>
```
