import { PencilSquare, Plus } from "@medusajs/icons"
import { Product, ProductOption } from "@medusajs/medusa"
import { Badge, Container, Heading, Text } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { ActionMenu } from "../../../../../components/common/action-menu"

type ProductOptionSectionProps = {
  product: Product
}

export const ProductOptionSection = ({
  product,
}: ProductOptionSectionProps) => {
  const { t } = useTranslation()

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("products.options.header")}</Heading>
        <ActionMenu
          groups={[
            {
              actions: [
                {
                  label: t("actions.create"),
                  to: "options/create",
                  icon: <Plus />,
                },
              ],
            },
          ]}
        />
      </div>
      {product.options.map((option) => {
        return (
          <div
            key={option.id}
            className="text-ui-fg-subtle grid grid-cols-[1fr_1fr_28px] items-start gap-4 px-6 py-4"
          >
            <Text size="small" leading="compact" weight="plus">
              {option.title}
            </Text>
            <div className="flex flex-wrap gap-1">
              {getUnqiueValues(option).map((value) => {
                return (
                  <Badge
                    key={value}
                    size="2xsmall"
                    className="flex min-w-[20px] items-center justify-center"
                  >
                    {value}
                  </Badge>
                )
              })}
            </div>
            <ActionMenu
              groups={[
                {
                  actions: [
                    {
                      label: t("actions.edit"),
                      to: `options/${option.id}/edit`,
                      icon: <PencilSquare />,
                    },
                  ],
                },
              ]}
            />
          </div>
        )
      })}
    </Container>
  )
}

const getUnqiueValues = (option: ProductOption) => {
  const values = option.values.map((v) => v.value)

  return Array.from(new Set(values))
}
