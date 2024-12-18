import * as React from "react";

// eslint-disable-next-line import/no-named-as-default
import VisibilityObserver from "../visibility-observer";

import type {ScrollVisibility} from "../visibility-observer";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Visibility Observer",
} as Story;

type Props = Record<any, any>;
type State = {
    sectionVisibility: ScrollVisibility;
};

class VisibilityTest extends React.Component<Props, State> {
    state: State = {
        sectionVisibility: "unknown",
    };

    handleVisibilityChanged = (visibility: ScrollVisibility) => {
        this.setState({sectionVisibility: visibility});
    };

    render(): React.ReactNode {
        const {sectionVisibility} = this.state;

        const visibleText =
            sectionVisibility === "visible" ? "Visible" : "Not Visible";

        return (
            <div>
                <p>Visibility: {visibleText}</p>

                <p>
                    {sectionVisibility === "hidden-above"
                        ? "The Section IS UP HERE!!!"
                        : "---"}
                </p>

                <div
                    style={{
                        height: 150,
                        width: 800,
                        overflow: "scroll",
                        backgroundColor: "white",
                        // @ts-expect-error [FEI-5003] - TS2322 - Type '{ height: number; width: number; overflow: "scroll"; backgroundColor: "white"; scrollbars: string; }' is not assignable to type 'Properties<string | number, string & {}>'.
                        scrollbars: "visible",
                    }}
                >
                    <p>
                        Ocicat american shorthair. Egyptian mau himalayan or
                        grimalkin maine coon cheetah lion but himalayan.
                        American bobtail lion kitten. Kitty bombay puma.
                        Savannah scottish fold for tabby but sphynx for bombay
                        kitten ragdoll. Puma russian blue yet singapura birman
                        and kitty russian blue. Egyptian mau cheetah, donskoy
                        for himalayan singapura abyssinian . Singapura
                        himalayan. Malkin abyssinian but balinese but bobcat.
                        Leopard puma, norwegian forest mouser and turkish
                        angora. Lynx bengal tiger. American shorthair. Donskoy
                        ragdoll. Siberian turkish angora cougar and russian
                        blue. Burmese savannah and siamese norwegian forest yet
                        cheetah himalayan lion. Ocelot kitten or munchkin but
                        kitten savannah. Cougar manx or russian blue american
                        shorthair so jaguar but havana brown. Cheetah havana
                        brown manx. Tiger thai american bobtail. Ragdoll bengal
                        yet kitten, bengal grimalkin scottish fold. Abyssinian
                        jaguar. Turkish angora bengal but kitty sphynx.{" "}
                    </p>

                    <VisibilityObserver
                        scrollParentIsNotBody={true}
                        onChange={this.handleVisibilityChanged}
                    >
                        <p
                            style={{
                                backgroundColor: "#eeddee",
                                fontWeight: "bold",
                            }}
                        >
                            American shorthair devonshire rex but cheetah and
                            ragdoll but bombay. Kitty. Tomcat cornish rex
                            donskoy but tom donskoy havana brown. Jaguar sphynx.
                            Cheetah kitty for kitty, but balinese . British
                            shorthair cheetah devonshire rex birman panther.
                            Kitten tabby but siamese, sphynx. Bombay maine coon
                            so lynx and donskoy kitten, but cougar. Sphynx
                            sphynx, so american bobtail or mouser or puma.
                            Mouser munchkin and ragdoll yet mouser cheetah
                            balinese . Egyptian mau siamese mouser, cougar
                            ragdoll. Persian birman tabby. Norwegian forest
                            norwegian forest cornish rex bengal. Panther bombay.
                            Kitty siamese ragdoll and egyptian mau. Tabby.
                            Cheetah havana brown, kitty for havana brown.
                            Cornish rex siberian russian blue so persian but
                            thai burmese. Maine coon puma. Lynx.
                        </p>
                    </VisibilityObserver>

                    <p>
                        Jaguar tom but himalayan birman. Turkish angora balinese
                        grimalkin but birman or kitty or munchkin. American
                        shorthair bobcat. Donskoy cornish rex malkin. Ocicat
                        tabby or siamese, birman. Devonshire rex tomcat yet thai
                        jaguar mouser and donskoy, lynx. Grimalkin bombay.{" "}
                    </p>
                    <p>
                        Eat grass, throw it back up mice and cats are fats i
                        like to pets them they like to meow back, cough furball
                        into food bowl then scratch owner for a new one purr as
                        loud as possible, be the most annoying cat that you can,
                        and, knock everything off the table, lick the other
                        cats. Furrier and even more furrier hairball cat is
                        love, cat is life so ooh, are those your $250 dollar
                        sandals? lemme use that as my litter box. Lick arm hair
                        love to play with owner&apos;s hair tie hunt anything
                        that moves. Destroy couch as revenge when in doubt,
                        wash.
                    </p>
                </div>

                <p>
                    {sectionVisibility === "hidden-below"
                        ? "The Section IS DOWN HERE!!!"
                        : "---"}
                </p>
            </div>
        );
    }
}

export const AlertWhenNotVisible = (args: StoryArgs): React.ReactElement => {
    return <VisibilityTest />;
};
