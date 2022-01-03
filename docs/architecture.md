# privacy.sexy architecture

## State

State is handled differently based on their layer.

[State](./../img/architecture/app-state.png)

This is similar to flux (`redux`) or flux-like (`vuex`) patterns. In terms of flux components, *view* is presentation layer in Vue, and *dispatcher*, *store* and *action creation* functions lie in the application layer. However privacy.sexy state is mutable and lies in single *store* that holds app state and logic. The *actions* mutate the state directly which in turns act as dispatcher to notify its own event subscriptions (callbacks).

*Presentation layer*:

- Each components holds their own state about presentation-related data.
- 📖 Read more in: Application state | Presentation layer

*Application layer*:

- Stores the application-specific state.
- The state it exposed for read with getter functions and set using setter functions, setter functions also fire application events that allows other parts of application and the view in presentation layer to react.
- So state is mutable, and fires related events when mutated.

📖 Read more in: Application state | Application layer

## Import export

Importing / exporting are implemented as two parts:

1. Encoding/
2. Model conversion

It's implemented in `application/ImportExport` as an internal module in application layer.

It's consumed by `ApplicationContext` for:

- Exporting data when generating script file
- Mutating its state data with related state events


