# Wonder Blocks: Forms

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

## Always wrap fields with LabeledField

Use `LabeledField` from `wonder-blocks-labeled-field` with `TextField`,
`TextArea`, `SingleSelect`, `MultiSelect`, and `SearchField` components. It
handles `htmlFor`/`id` wiring and setting `aria-describedby` for the related
description, error message, etc.

```tsx
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {TextField} from "@khanacademy/wonder-blocks-form";

<LabeledField
    label={t`Field name`}
    description={t`Description for the user`}
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
    label={t`Category`}
    field={
        <SingleSelect
            placeholder={t`Choose a category`}
            selectedValue={selectedValue}
            onChange={setSelectedValue}
        >
            <OptionItem label={t`Option 1`} value="option1" />
            <OptionItem label={t`Option 2`} value="option2" />
            <OptionItem label={t`Option 3`} value="option3" />
        </SingleSelect>
    }
/>

// Multi select
<LabeledField
    label={t`Categories`}
    field={
        <MultiSelect
            selectedValues={selectedValues}
            onChange={setSelectedValues}
        >
            <OptionItem label={t`Option 1`} value="option1" />
            <OptionItem label={t`Option 2`} value="option2" />
            <OptionItem label={t`Option 3`} value="option3" />
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
    label={t`Choose your options`}
    description={t`Select all that apply`}
    errorMessage={checkboxError}
    groupName="options"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
>
    <Choice label={t`Option 1`} value="option1" />
    <Choice label={t`Option 2`} value="option2" />
    <Choice label={t`Option 3`} value="option3" />
</CheckboxGroup>

// Radio buttons
const [selectedValue, setSelectedValue] = useState<string>("");

<RadioGroup
    label={t`Choose one option`}
    description={t`Select the option that best applies`}
    errorMessage={radioError}
    groupName="option"
    onChange={setSelectedValue}
    selectedValue={selectedValue}
>
    <Choice label={t`Option 1`} value="option1" />
    <Choice label={t`Option 2`} value="option2" />
    <Choice label={t`Option 3`} value="option3" />
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
    label={t`Title`}
    errorMessage={errorMessage}
    field={
        <TextField
            value={value}
            onChange={setValue}
            instantValidation={false}
            validate={(value) => {
                if (value.trim().length < 5) {
                    return t`Title must be at least 5 characters`;
                }
            }}
            onValidate={setErrorMessage}
        />
    }
/>
```

### Form submission

- Use a `<form>` element to wrap form fields. Avoid using key event handlers
  directly on the `<form>` element since it is non-interactive.
- To submit a form when the `Enter` key is pressed, include a `Button` with
  `type="submit"` inside the form and handle submission using the `onSubmit`
  prop on the `<form>` element. The "Enter to submit" functionality is handled
  by the browser.
- Be cautious when adding this behavior to learner-facing interactions,
  especially those where the activity is scored and cannot be undone. Not all
  users are aware of this control functionality and it could result in accidental
  submissions. For these use cases, you don't need to wrap the fields in a
  `<form>` element. Use a `Button` and handle the submission `onClick`.
- Form controls that initiate a change in context should have a submit button to
  prevent an unexpected change of context. Examples of context changes: change
  of user agent, viewport, focus or content that changes the meaning of the web
  page.
- Avoid disabling form submission buttons, unless the button is for submitting
  only one form field.

For form elements, use `addStyle` to create a `StyledForm` element so that
Aphrodite styles can be applied.

```tsx
import {addStyle} from "@khanacademy/wonder-blocks-core";

const StyledForm = addStyle("form");

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm({value});
}

<StyledForm onSubmit={handleSubmit} style={styles.form}>
  <LabeledField label={t`Name`} field={<TextField value={value} onChange={setValue} />} />
  <Button type="submit">{t`Submit`}</Button>
</StyledForm>

const styles = StyleSheet.create({
    form: {
        gap: sizing.size_080,
    },
});
```

### Validation after submission

- If an error comes from outside the field (e.g. API error, cross-field
  validation on submit), set `errorMessage` on `LabeledField` for the specific
  field.

```tsx
<LabeledField
    label={t`Title`}
    errorMessage={serverError}
    field={
        <TextField
            value={code}
            onChange={setCode}
        />
    }
/>
```

- If there are any errors once a form is submitted, programmatically move the
  user's focus to the first field with an error. This includes required fields
  that are empty.
- When **more than one** error is present, display a
  `Banner` with `kind="critical"` containing an error summary at the top of the
  form and move focus to the first errored field. This announces the list of
  errors before the user moves through the form to fix them. Do not show the
  Banner for a single error — the inline `errorMessage` on `LabeledField` is
  sufficient in that case.

```tsx
const titleRef = useRef<HTMLInputElement>(null);
const descriptionRef = useRef<HTMLInputElement>(null);

const handleSubmit = (event) => {
    event.preventDefault();
    // ... Submit form and determine if there are errors with the field
    setTitleError(titleError);
    setDescriptionError(descriptionError);

    // Move focus to the first field with an error
    if (titleError && titleRef.current) {
        titleRef.current.focus();
    } else if (descriptionError && descriptionRef.current) {
        descriptionRef.current.focus();
    }
};

<StyledForm onSubmit={handleSubmit}>
    <LabeledField
        label={t`Title`}
        errorMessage={titleError}
        field={<TextField ref={titleRef} value={title} onChange={setTitle} />}
    />
    <LabeledField
        label={t`Description`}
        errorMessage={descriptionError}
        field={<TextArea ref={descriptionRef} value={description} onChange={setDescription} />}
    />
    <Button type="submit">{t`Submit`}</Button>
</StyledForm>
```

The banner should look something like this and include an `ul` of the errors. It
should only be updated when the form is re-submitted.

```tsx
<Banner
    kind="critical"
    text={
        <>
            {t`There are X errors. Please review the fields below.`}
            <StyledUl
                style={styles.bannerUl}
            >
                {[
                    {label: titleLabel, error: titleError},
                    {label: descriptionLabel, error: descriptionError},
                ]
                    .filter(({error}) => error)
                    .map((field) => (
                        <StyledLi
                            key={field.label}
                            style={styles.bannerLi}
                        >
                            {field.label}: {field.error}
                        </StyledLi>
                    ))}
            </StyledUl>
        </>
    }
/>

const styles = StyleSheet.create({
    bannerUl: {
        color: "inherit",
        fontSize: "inherit",
        lineHeight: "inherit",
        paddingInlineStart: sizing.size_200,
        marginBlockEnd: 0,
        marginBlockStart: sizing.size_120,
        display: "flex",
        flexDirection: "column",
        gap: sizing.size_040,
    },
    bannerLi: {
        color: "inherit",
        fontSize: "inherit",
        lineHeight: "inherit",
        listStyle: "disc",
    },
})
```
