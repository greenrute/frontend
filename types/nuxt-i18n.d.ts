import {DefineLocaleMessage, VueI18nResolveLocaleMessageTranslation, VueI18nTranslation, VueI18nTranslationChoice} from 'vue-i18n'
import {PickupKeys, RemoveIndexSignature} from '@intlify/core-base'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: VueI18nTranslation<Messages, Locales, RemoveIndexSignature<{
      [K in keyof DefineLocaleMessage]: DefineLocaleMessage[K];
    }>>;
    $rt: VueI18nResolveLocaleMessageTranslation<Locales>;
    $tc: VueI18nTranslationChoice<Messages, Locales, RemoveIndexSignature<{
      [K in keyof DefineLocaleMessage]: DefineLocaleMessage[K];
    }>>;
    $te<Str extends string, Key extends PickupKeys<Messages> = PickupKeys<Messages>>(key: Str | Key, locale?: Locales): boolean;
    $tm: Composition['tm'];
  }

  class ComponentCustomPropertiesImpl implements ComponentCustomProperties {
  }
}
